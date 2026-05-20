export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="font-display text-xl font-semibold">
              Wheel <span className="text-accent">&</span> Wash
            </div>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Hand-cleaning and sanitising for prams, buggies and travel
              systems. Collected and returned across London.
            </p>
          </div>

          <div className="text-sm">
            <div className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
              Contact
            </div>
            <a href="mailto:hello@wheelandwash.co" className="block hover:text-accent">
              hello@wheelandwash.co
            </a>
            <a href="tel:+442012345678" className="block hover:text-accent">
              020 1234 5678
            </a>
            <p className="mt-2 text-muted">Mon–Sat · 9am–5pm</p>
          </div>

          <div className="text-sm">
            <div className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
              Service area
            </div>
            <p className="text-muted">
              Free collection within Zones 1–3. £10 collection fee Zones 4–6.
              Outside London? Just ask.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Wheel & Wash Ltd. A fictional demo.</p>
          <p>Bookings powered by Cal.com · Payments by Stripe</p>
        </div>
      </div>
    </footer>
  );
}
