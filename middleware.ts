import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, getSessionSecret, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

const isDev = process.env.NODE_ENV !== "production";

// Nonce-based CSP: each request gets a fresh, unpredictable nonce and the
// script-src allows only that nonce (plus 'strict-dynamic' so scripts it loads
// inherit trust). This removes 'unsafe-inline' from script-src entirely.
// 'unsafe-eval' stays in dev only (React's dev runtime needs it). style-src
// keeps 'unsafe-inline' because the app uses inline style props, which nonces
// cannot cover. Next.js reads the CSP from the request header and applies the
// nonce to its own framework/page scripts automatically.
function buildCsp(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.stripe.com",
    "form-action 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
  ].join("; ");
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce);

  // Forward the nonce + CSP to the app so Next can inject the nonce during SSR.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const withCsp = (res: NextResponse): NextResponse => {
    res.headers.set("content-security-policy", csp);
    return res;
  };

  const isAdminArea = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isLogin = pathname === "/admin/login" || pathname === "/api/admin/login";

  // Admin gate — everything under /admin and /api/admin except the login
  // page/endpoint requires a valid session. (Login stays reachable so users
  // can authenticate.)
  if (isAdminArea && !isLogin) {
    // Fail CLOSED: login is only possible when ADMIN_PASSWORD is set, so treat a
    // missing password as "not configured" and deny access to the admin area.
    if (!process.env.ADMIN_PASSWORD) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "not_configured");
      return withCsp(NextResponse.redirect(url));
    }

    // getSessionSecret() is non-empty here because ADMIN_PASSWORD is set.
    const secret = getSessionSecret()!;
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!(await verifySessionToken(secret, token))) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("from", pathname);
      return withCsp(NextResponse.redirect(loginUrl));
    }
  }

  return withCsp(NextResponse.next({ request: { headers: requestHeaders } }));
}

export const config = {
  // Run on all routes so the CSP is applied site-wide, except Next's static
  // assets (which don't need it) and link prefetches. This still covers /admin
  // and /api/admin for the auth gate above.
  matcher: [
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
