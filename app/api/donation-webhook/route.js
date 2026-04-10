import Stripe from "stripe";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Session metadata:", session.metadata);
    console.log("Session type:", session.metadata?.type);

    if (session.metadata?.type !== "donation") {
      console.log("Skipping - not a donation");
      return NextResponse.json({ received: true });
    }

    const meta = session.metadata;

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        session.payment_intent,
        {
          expand: ["payment_method"],
        },
      );

      const card = paymentIntent.payment_method.card;
      const paymentType = card?.brand ? `card_${card.brand}` : "stripe";

      await pool.execute(
        `INSERT INTO Donations (donationId, email, paymentType, donationAmount, confirmation, donationDate)
   VALUES (?, ?, ?, ?, ?, ?)`,
        [
          session.payment_intent,
          session.customer_details?.email || null,
          paymentType,
          session.amount_total / 100,
          1,
          new Date(session.created * 1000),
        ],
      );

      console.log(
        `Donation saved: ${session.amount_total / 100} ${session.currency}`,
      );
    } catch (dbErr) {
      console.error("DB insert error:", dbErr);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
