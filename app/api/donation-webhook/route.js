import Stripe from "stripe";
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { randomUUID } from "crypto";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_DONATIONS_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.metadata?.type !== "donation") {
      return NextResponse.json({ received: true });
    }

    const meta = session.metadata;
    const amount = session.amount_total / 100;
    const donorEmail = session.customer_details?.email || meta.donor_email || null;
    const fullName = meta.fullName || null;
    const purposeId = meta.purposeId || null;
    const purposeTitle = meta.purposeTitle || null;

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent,
        { expand: ["payment_method"] },
      );

      const card = paymentIntent.payment_method?.card;
      const paymentType = card?.brand ? `card_${card.brand}` : "stripe";

      await pool.execute(
        `INSERT INTO Donations
          (donationId, email, paymentType, donationAmount, confirmation, donationDate, purposeId, campaign)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          session.payment_intent,
          donorEmail,
          paymentType,
          amount,
          1,
          new Date(session.created * 1000),
          purposeId || null,
          purposeTitle || null,
        ],
      );

      await pool.execute(
        `INSERT INTO DonationReceipt
          (receiptId, donationId, fullName, paymentType, donationAmount, purposeTitle)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          randomUUID(),
          session.payment_intent,
          fullName,
          paymentType,
          amount,
          purposeTitle || null,
        ],
      );

      console.log(`Donation saved: $${amount} from ${donorEmail}`);
    } catch (dbErr) {
      console.error("DB insert error:", dbErr);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
