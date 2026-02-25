import { NextResponse } from "next/server";

export async function GET(req) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Store securely (DB recommended) 
  const response = NextResponse.redirect("http://localhost:3000");
  response.cookies.set("google_tokens", JSON.stringify(tokens), {
    httpOnly: true,
    secure: true,
  });

  return response;
}