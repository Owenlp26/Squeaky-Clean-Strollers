import { NextRequest, NextResponse } from "next/server";
import { saveRefreshToken } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!code) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=no_code`);
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${siteUrl}/api/admin/calendar-callback`,
      grant_type: "authorization_code",
    }),
  });

  if (!res.ok) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=token_exchange`);
  }

  const data = await res.json();
  if (!data.refresh_token) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=no_refresh_token`);
  }

  await saveRefreshToken(data.refresh_token);
  return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?connected=true`);
}
