import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Recieves token from front end (UI)
    const { token } = await req.json();

    // Validates input
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Missing reCAPTCHA token." },
        { status: 400 }
      );
    }

    // Uses secret key from .env file
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Missing reCAPTCHA secret key." },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    // Sends request to Google to verify
    const googleRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const data = await googleRes.json();

    // Will block invalid users
    if (!data.success) {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA verification failed.",
          errors: data["error-codes"] || [],
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("reCAPTCHA verify error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to verify reCAPTCHA right now." },
      { status: 500 }
    );
  }
}