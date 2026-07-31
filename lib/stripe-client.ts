import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    // Trim to guard against a stray space/newline pasted into the env var —
    // an invalid character in the key makes requests fail as a "connection" error.
    const key = (process.env.STRIPE_SECRET_KEY ?? "").trim();
    _stripe = new Stripe(key, {
      apiVersion: "2026-05-27.dahlia",
      // Use the fetch-based HTTP client — the default Node client can fail to
      // connect in serverless/edge runtimes (Netlify).
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return _stripe;
}

// Keep named export for backwards compat with lazy proxy pattern
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
