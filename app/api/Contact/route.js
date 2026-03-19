import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email } = await req.json();

  try {
    await resend.emails.send({
      from: 'PASOC Guest Form <onboarding@resend.dev>',
      to: 'your-pasoc-email@gmail.com',
      reply_to: email,
      subject: `New Guest Inquiry from ${name}`,
      html: `
        <h2>New Guest Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}