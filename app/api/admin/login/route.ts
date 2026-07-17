import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/db";
import { getClientIp } from "@/lib/client-ip";
import {
  createSessionToken,
  getSessionSecret,
  safeEqual,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
} from "@/lib/admin-auth";

const MAX_ATTEMPTS = 10;
const WINDOW_SECONDS = 15 * 60; // 15 minutes

export async function POST(req: NextRequest) {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Fail closed — no credentials configured means no login is possible.
  if (!adminPassword || !adminUsername) {
    return NextResponse.json({ error: "Admin login not configured" }, { status: 503 });
  }

  // Rate limit by client IP to blunt brute-force attempts. If Redis is
  // unavailable we let the attempt through rather than locking everyone out.
  const ip = getClientIp(req);
  const rateKey = `login_attempts:${ip}`;

  try {
    const attempts = await redis.incr(rateKey);
    if (attempts === 1) await redis.expire(rateKey, WINDOW_SECONDS);
    if (attempts > MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }
  } catch (err) {
    console.error("Login rate-limit check failed (allowing attempt):", err);
  }

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = typeof body.username === "string" ? body.username : "";
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ok = safeEqual(username, adminUsername) && safeEqual(password, adminPassword);
  if (!ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Success — clear the rate-limit counter and issue a signed session token.
  try {
    await redis.del(rateKey);
  } catch {
    /* non-fatal */
  }

  // Sign with the session secret (ADMIN_SESSION_SECRET if set, else the
  // password) so the token key can be rotated independently of the password.
  const token = await createSessionToken(getSessionSecret()!);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    // "lax" (not "strict") so the cookie is still sent on the top-level GET
    // navigation back from Google's OAuth consent to /api/admin/calendar-callback.
    // Strict would withhold it there and the middleware would bounce the callback
    // to /admin/login, breaking calendar setup. State-changing endpoints are POST,
    // and lax withholds the cookie on cross-site POST/fetch, so CSRF is still covered.
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: ADMIN_COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
