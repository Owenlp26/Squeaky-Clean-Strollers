/**
 * AES-256-GCM encryption for secrets stored at rest (e.g. the Google Calendar
 * refresh token in Redis). If Redis is ever exposed, the token is ciphertext.
 *
 * The key is derived from TOKEN_ENCRYPTION_KEY if set, otherwise from
 * GOOGLE_CLIENT_SECRET (always present when the calendar is in use), so this
 * works with zero extra configuration but can be strengthened with a dedicated
 * key. Values are prefixed "enc:v1:" — anything without that prefix is treated
 * as legacy plaintext and returned as-is, so existing stored tokens keep working.
 */

const PREFIX = "enc:v1:";

function b64FromBytes(bytes: Uint8Array): string {
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function bytesFromB64(s: string): Uint8Array {
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function keyMaterial(): string {
  const secret = process.env.TOKEN_ENCRYPTION_KEY || process.env.GOOGLE_CLIENT_SECRET;
  if (!secret) throw new Error("No encryption key available (set TOKEN_ENCRYPTION_KEY)");
  return secret;
}

async function aesKey(): Promise<CryptoKey> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(keyMaterial()) as BufferSource);
  return crypto.subtle.importKey("raw", hash, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

export async function encryptSecret(plaintext: string): Promise<string> {
  const key = await aesKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plaintext) as BufferSource
  );
  return `${PREFIX}${b64FromBytes(iv)}:${b64FromBytes(new Uint8Array(ct))}`;
}

export async function decryptSecret(stored: string): Promise<string> {
  // Legacy plaintext (written before encryption existed) — return unchanged.
  if (!stored.startsWith(PREFIX)) return stored;

  const [ivB64, ctB64] = stored.slice(PREFIX.length).split(":");
  const key = await aesKey();
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: bytesFromB64(ivB64) as BufferSource },
    key,
    bytesFromB64(ctB64) as BufferSource
  );
  return new TextDecoder().decode(pt);
}
