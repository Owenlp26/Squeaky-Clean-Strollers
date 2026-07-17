/**
 * Admin session tokens — signed with HMAC-SHA256 so the cookie NEVER contains
 * the password itself. Self-verifying (no server-side session store needed) and
 * works in both the Edge middleware and Node route handlers via Web Crypto.
 *
 * Token format:  base64url(payloadJSON).base64url(hmacSig)
 * Payload:       { exp: <epoch ms> }
 */

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function b64urlFromBytes(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function bytesFromB64url(s: string): Uint8Array {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function b64urlFromString(s: string): string {
  return b64urlFromBytes(new TextEncoder().encode(s));
}

function stringFromB64url(s: string): string {
  return new TextDecoder().decode(bytesFromB64url(s));
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Create a signed session token that expires after 7 days. */
export async function createSessionToken(secret: string): Promise<string> {
  const payload = JSON.stringify({ exp: Date.now() + COOKIE_MAX_AGE_SECONDS * 1000 });
  const payloadB64 = b64urlFromString(payload);
  const key = await hmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64) as BufferSource);
  return `${payloadB64}.${b64urlFromBytes(new Uint8Array(sig))}`;
}

/** Verify a session token's signature and expiry. Returns false on anything suspicious. */
export async function verifySessionToken(secret: string, token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;

  try {
    const key = await hmacKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      bytesFromB64url(sigB64) as BufferSource,
      new TextEncoder().encode(payloadB64) as BufferSource
    );
    if (!valid) return false;

    const { exp } = JSON.parse(stringFromB64url(payloadB64)) as { exp?: number };
    if (typeof exp !== "number" || Date.now() > exp) return false;

    return true;
  } catch {
    return false;
  }
}

/** Constant-time string comparison — avoids leaking the password via response timing. */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export const ADMIN_COOKIE_NAME = "admin_auth";
export const ADMIN_COOKIE_MAX_AGE = COOKIE_MAX_AGE_SECONDS;
