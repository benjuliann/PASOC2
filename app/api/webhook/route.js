import Stripe from "stripe";
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.metadata?.type !== "membership") {
      return NextResponse.json({ received: true });
    }

    const meta = session.metadata;
    const memberUUID = uuidv4();
    const today = new Date().toISOString().split("T")[0];
    const fullName = `${meta.first_name} ${meta.last_name}`.trim();

    try {
      // Fetch active pricing (no endDate means current)
      const [pricing] = await pool.execute(
        `SELECT priceId, memberPrice, dependantPrice 
         FROM Pricing 
         WHERE endDate IS NULL 
         LIMIT 1`
      );

      if (!pricing[0]) {
        console.error("No active pricing found");
        return NextResponse.json({ error: "No active pricing" }, { status: 500 });
      }

      const { priceId, memberPrice, dependantPrice } = pricing[0];
      const dependantCount = parseInt(meta.dependants || "0", 10);
      const totalAmount = memberPrice + dependantCount * dependantPrice;

      // 1. Insert into UserLogin FIRST
      await pool.execute(
        `INSERT INTO UserLogin (uuid, email)
        VALUES (?, ?)`,
        [
          memberUUID,
          meta.email || session.customer_details?.email || null,
        ]
      );

      // 2. Then insert into MemberInfo
      await pool.execute(
        `INSERT INTO MemberInfo 
          (uuid, roleId, name, dateOfBirth, applicationDate, address, postalCode, primaryPhone, secondaryPhone, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          memberUUID,
          3,
          fullName,
          meta.date_of_birth || null,
          today,
          meta.address || null,
          meta.postal_code || null,
          meta.phone || null,
          meta.secondary_phone || null,
          meta.email || session.customer_details?.email || null,
        ]
      );

      // Insert dependants if any
      for (let i = 0; i < dependantCount; i++) {
        const depName = meta[`dep_${i}_name`] || null;
        const depDOB = meta[`dep_${i}_dob`] || null;

        if (depName) {
          await pool.execute(
            `INSERT INTO MemberDependencies (uuid, name, dateOfBirth)
             VALUES (?, ?, ?)`,
            [memberUUID, depName, depDOB]
          );
        }
      }

      // Record payment in MembershipPayments
      await pool.execute(
        `INSERT INTO MembershipPayments 
          (uuid, priceId, paymentType, amount, memberPrice, dependantPrice, confirmation, recordedBy)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          memberUUID,
          priceId,
          "stripe",
          totalAmount,
          memberPrice,
          dependantPrice,
          session.payment_intent,
          null, // Stripe payment, no admin recorded it
        ]
      );

      console.log(`✅ Member saved: ${fullName} (${memberUUID})`);
    } catch (dbErr) {
      console.error("DB insert error:", dbErr);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}