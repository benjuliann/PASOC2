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

    // Only process membership payments
    if (session.metadata?.type !== "membership") {
      return NextResponse.json({ received: true });
    }

    const meta = session.metadata;
    const memberUUID = uuidv4();
    const today = new Date().toISOString().split("T")[0];
    const fullName = `${meta.first_name} ${meta.last_name}`.trim();

    try {
      // Insert primary member
      await pool.execute(
        `INSERT INTO MemberInfo 
          (uuid, name, dateOfBirth, applicationDate, address, postalCode, primaryPhone, email, isAdmin, memberID)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          memberUUID,
          fullName,
          meta.date_of_birth || null,
          today,
          meta.address || null,
          meta.postal_code || null,
          meta.phone || null,
          meta.email || session.customer_details?.email || null,
          0,
          null,
        ]
      );

      // Insert dependants if any
      const dependantCount = parseInt(meta.dependants || "0", 10);
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

      // Record the payment in Donations
      await pool.execute(
        `INSERT INTO Donations (uuid, paymentType, donationAmount, confirmation)
         VALUES (?, ?, ?, ?)`,
        [
          memberUUID,
          "stripe",
          session.amount_total / 100,
          session.payment_intent,
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