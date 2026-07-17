import type { NextRequest } from "next/server";

/**
 * Resolve the real client IP for rate limiting.
 *
 * The client-supplied `X-Forwarded-For` header is untrusted: a caller can send
 * any value they like as the *leftmost* entry, which would let them land in a
 * fresh rate-limit bucket on every request. So we prefer headers that our own
 * infrastructure sets and the client cannot forge:
 *
 *   1. `x-nf-client-connection-ip` — Netlify's real client IP (our deploy target).
 *   2. `x-real-ip`                  — set by many proxies to the true peer.
 *   3. `x-forwarded-for` (RIGHTMOST) — the entry appended by the closest trusted
 *      hop, rather than the attacker-controlled leftmost one.
 *
 * Returns "unknown" if nothing usable is present, which buckets all such callers
 * together (fail-safe for a shared limit rather than fail-open per request).
 */
export function getClientIp(req: NextRequest): string {
  const netlifyIp = req.headers.get("x-nf-client-connection-ip")?.trim();
  if (netlifyIp) return netlifyIp;

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (parts.length > 0) return parts[parts.length - 1];
  }

  return "unknown";
}
