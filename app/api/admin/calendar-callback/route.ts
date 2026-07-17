import { NextRequest, NextResponse } from "next/server";
import { saveRefreshToken } from "@/lib/google-calendar";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  // CSRF check: the returned state must match the cookie we set on auth start.
  const expectedState = req.cookies.get("calendar_oauth_state")?.value;
  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=bad_state`);
  }

  if (!code) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=no_code`);
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
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

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=token_exchange`);
  }

  const data = await tokenRes.json();
  if (!data.refresh_token) {
    return NextResponse.redirect(`${siteUrl}/admin/calendar-setup?error=no_refresh_token`);
  }

  await saveRefreshToken(data.refresh_token);
  const redirectRes = NextResponse.redirect(`${siteUrl}/admin/calendar-setup?connected=true`);
  redirectRes.cookies.delete("calendar_oauth_state");
  return redirectRes;
}
