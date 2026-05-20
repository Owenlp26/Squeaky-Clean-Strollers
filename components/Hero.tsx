import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-16 pb-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pt-24 lg:pb-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Now collecting across London
          </div>

          <h1 className="mt-6 max-w-2xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Your pram, brought back to <span className="text-accent">brand-new.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Hand-cleaning, deep sanitising and full restorations — collected
            from your door, returned drier than the day you bought it. Trusted
            by 800+ London families.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#services"
              className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
            >
              Choose a service
            </Link>
            <Link
              href="/#how"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              How it works
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border/60 pt-6 text-sm">
            <div>
              <dt className="text-muted">Cleans completed</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">2,400+</dd>
            </div>
            <div>
              <dt className="text-muted">Average rating</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">
                4.9 <span className="text-base text-gold">★</span>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Turnaround</dt>
              <dd className="mt-1 font-display text-2xl font-semibold">48hrs</dd>
            </div>
          </dl>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-accent-soft blur-3xl opacity-60"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #eef2ea 0%, #d8dfd6 40%, #b8c2b7 100%)",
              }}
            />
            <svg
              viewBox="0 0 400 500"
              className="absolute inset-0 h-full w-full"
              aria-label="Illustration of a pram"
              role="img"
            >
              <g stroke="#3c4a3c" strokeWidth="6" strokeLinecap="round" fill="none">
                <path d="M120 230 L120 150 Q120 110 160 110 L260 110 Q300 110 300 150 L300 230" />
                <path d="M120 230 L300 230 L290 320 L130 320 Z" fill="#e9efe6" />
                <path d="M100 235 L130 235" />
                <path d="M290 235 L320 235" />
                <line x1="155" y1="325" x2="120" y2="400" />
                <line x1="265" y1="325" x2="300" y2="400" />
                <circle cx="115" cy="415" r="28" fill="#3c4a3c" />
                <circle cx="305" cy="415" r="28" fill="#3c4a3c" />
                <circle cx="115" cy="415" r="9" fill="#e9efe6" stroke="none" />
                <circle cx="305" cy="415" r="9" fill="#e9efe6" stroke="none" />
                <path d="M170 145 Q210 130 250 145" />
              </g>
              <g fill="#7a8b7a" opacity="0.4">
                <circle cx="60" cy="80" r="6" />
                <circle cx="350" cy="60" r="4" />
                <circle cx="40" cy="300" r="5" />
                <circle cx="360" cy="340" r="7" />
              </g>
            </svg>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-background/85 px-4 py-3 backdrop-blur">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted">
                  Last clean
                </div>
                <div className="text-sm font-medium">Bugaboo Fox 5 · Deep Clean</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted">Returned</div>
                <div className="text-sm font-medium">today, 4:12pm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
