# Wheel & Wash — pram-cleaning booking exemplar

A working mock website for a fictional London pram-cleaning business with a
**real** booking + payment flow:

- **Booking & availability:** [Cal.com](https://cal.com) (open-source Calendly,
  free tier) embedded inline per service.
- **Payment:** [Stripe](https://stripe.com) in **test mode**, wired into
  Cal.com's Stripe app via Stripe Connect. The customer picks a slot, Cal
  collects card details with Stripe Elements, and the booking is only confirmed
  once the PaymentIntent succeeds.
- **Frontend:** Next.js 16 (App Router) + Tailwind v4 + TypeScript.

Pick a service → see real availability → pay with test card `4242 4242 4242
4242` → booking confirmed. End to end.

---

## Quick start

```bash
npm install
cp .env.local.example .env.local   # fill in NEXT_PUBLIC_CAL_USERNAME
npm run dev
```

Open <http://localhost:3000>. The landing page and service pages render fine
with no env set — the **Cal embed** on the booking pages will show a "setup
required" panel until you complete the steps below.

---

## Full setup (≈10 minutes)

### 1. Cal.com account

1. Sign up at <https://cal.com> (free).
2. Set your timezone and availability schedule (default Mon–Sat, 9am–5pm is
   fine for the demo).
3. Note your username — it's the `username` part of `cal.com/username`. You'll
   put this in `.env.local`.

### 2. Connect Stripe to Cal.com (test mode)

1. In Stripe (<https://dashboard.stripe.com>), make sure the toggle at the top
   says **Test mode** — this is critical, otherwise you'll be taking real
   payments.
2. In Cal.com → **Apps** → search for **Stripe** → **Install**.
3. Go through the OAuth flow. Cal uses Stripe Connect Standard accounts —
   payments are processed on **your** Stripe account.

### 3. Create one event type per service

In Cal.com → **Event Types** → create four event types with these exact slugs
(the slugs must match `data/services.ts`):

| Service | Slug | Duration | Price |
|---|---|---|---|
| Express Refresh | `express-refresh-30` | 30 min | £35 |
| Standard Clean | `standard-clean-60` | 60 min | £55 |
| Deep Clean & Sanitise | `deep-clean-90` | 90 min | £85 |
| Newborn-Ready Detail | `newborn-ready-120` | 120 min | £125 |

For each one:

- Set **Duration** to match.
- Go to the event's **Apps** tab → enable **Stripe**.
- Set **Price** in **GBP** and **Currency** to GBP.

(Want different services or prices? Just edit `data/services.ts` and create
matching event types in Cal.)

### 4. Configure env vars

In `.env.local`:

```bash
NEXT_PUBLIC_CAL_USERNAME=your-cal-username
```

Restart the dev server so Next picks up the new env var.

### 5. Test the full flow

1. `npm run dev` → <http://localhost:3000>.
2. Click **Book Deep Clean & Sanitise** on the landing page.
3. The Cal embed loads, showing real available slots. Pick one.
4. The embed advances to its payment step (Stripe Elements). Enter:
   - Card: `4242 4242 4242 4242`
   - Expiry: any future date
   - CVC: any 3 digits
   - Postcode: any (e.g. `E8 4QJ`)
5. The PaymentIntent succeeds → embed redirects to `/thanks`.
6. Verify:
   - **Cal.com dashboard → Bookings**: the booking shows as **Paid**.
   - **Stripe dashboard (test mode) → Payments**: a successful £85 PaymentIntent.

### 6. (Optional) Webhook for BOOKING_PAID

Useful if you want to do anything server-side when a booking is confirmed
(send to a DB, fire a Slack, etc).

1. Expose your dev server: `npx ngrok http 3000` → copy the HTTPS URL.
2. Cal.com → **Settings → Developer → Webhooks** → **New webhook**:
   - URL: `https://<your-ngrok-url>/api/webhooks/cal`
   - Subscribe to **Booking Paid** only
   - Secret: generate a long random string, copy it
3. Add to `.env.local`:
   ```
   CAL_WEBHOOK_SECRET=the-secret-you-pasted
   ```
4. Restart `npm run dev`. Next paid booking should print
   `[cal webhook] BOOKING_PAID …` in your terminal.

The handler verifies `x-cal-signature-256` against the secret using
`HMAC-SHA256` with a timing-safe comparison. See `lib/verifyCalWebhook.ts`.

---

## Negative-path smoke test

Want to see the failure handling? On the payment step, use card
`4000 0000 0000 0002` (Stripe's "always declines" test card). The embed shows
an error, no booking is created, and you can pick another slot to retry.

---

## File map

```
app/
  layout.tsx                      ← global shell (fonts, header, footer)
  page.tsx                        ← landing (hero, services, how-it-works, FAQ)
  globals.css                     ← Tailwind + design tokens (sage/cream palette)
  book/[slug]/page.tsx            ← per-service booking page (server)
  book/[slug]/BookingEmbed.tsx    ← 'use client' wrapper for <Cal />
  thanks/page.tsx                 ← confirmation screen
  api/webhooks/cal/route.ts       ← BOOKING_PAID handler (HMAC verified)
components/                       ← Header, Footer, Hero, ServiceCard, etc.
data/services.ts                  ← service catalogue — single source of truth
lib/verifyCalWebhook.ts           ← HMAC helper
```

---

## Known sharp edges

- **React 19 + `@calcom/embed-react`** — there are known SSR warnings; we mount
  the `<Cal />` inside a `'use client'` component to avoid them. If you hit
  hard errors, swap to `@calcom/embed-snippet` (script tag flavour) from the
  same client component.
- **Free-tier branding** — the embed shows a "Powered by Cal.com" footer;
  removing it requires the Teams plan.
- **Payment bypass on rebook** ([Cal.com #22126](https://github.com/calcom/cal.com/issues/22126)) —
  there's an open bug where abandoning the payment step and rebooking can
  bypass payment. Fine for a demo, must be checked before going to production.

---

## What this is *not*

- A production site. There's no:
  - Database (Cal.com is the system of record for bookings)
  - Auth (the staff side lives in Cal.com)
  - Refund / dispute handling
  - Multi-location / round-robin staff routing (Cal Teams)
- A real business — Wheel & Wash is fictional.

## Cost & scale notes (for the follow-up conversation)

- **Cal.com free tier:** unlimited event types & bookings, Stripe app
  included. Branding footer. Single-user only.
- **Cal.com Teams (£12 / user / mo):** removes branding, adds round-robin
  routing, managed users — what you'd want if Wheel & Wash had real staff.
- **Self-hosted Cal.com:** zero per-seat cost, you run the infra. Worth it
  above ~10 seats.
- **Stripe fees (UK):** 1.5% + 20p domestic, 2.5% + 20p EEA, 3.25% + 20p
  international. Cal.com itself takes nothing on top.
- **Webhook reliability:** if booking events drive downstream systems, add an
  idempotent record on `bookingUid` and re-fetch from the Cal API on retries.

## Reference docs

- Cal.com embed: <https://cal.com/docs/developing/embeds/embed-instructions/embed-overview>
- Cal.com webhooks: <https://cal.com/docs/developing/guides/automation/webhooks>
- Cal.com Stripe app: <https://cal.com/docs/self-hosting/apps/install-apps/stripe>
- Stripe Connect Standard: <https://stripe.com/docs/connect/standard-accounts>
- Stripe test cards: <https://stripe.com/docs/testing>
