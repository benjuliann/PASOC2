import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req) {
  const tokenCookie = req.cookies.get("google_tokens");

  if (!tokenCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const tokens = JSON.parse(tokenCookie.value);

  const auth = new google.auth.OAuth2();
  auth.setCredentials(tokens);

  const photos = google.photoslibrary({ version: "v1", auth });

  const result = await photos.mediaItems.list({
    pageSize: 25,
  });

  return NextResponse.json(result.data);
}