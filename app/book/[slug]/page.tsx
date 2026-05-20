import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getServiceBySlug } from "@/data/services";
import BookingEmbed from "./BookingEmbed";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `Book ${service.name} — Wheel & Wash`,
    description: service.blurb,
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const username = process.env.NEXT_PUBLIC_CAL_USERNAME;
  const calLink = username ? `${username}/${service.calEventSlug}` : null;
  const redirectUrl =
    process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/thanks?service=${service.slug}`
      : `/thanks?service=${service.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16">
      <Link
        href="/#services"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M12.7 15.7a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 1 1 1.4 1.4L8.4 10l4.3 4.3a1 1 0 0 1 0 1.4Z"
            clipRule="evenodd"
          />
        </svg>
        All services
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {service.tagline}
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {service.name}
            </h1>

            <div className="mt-5 flex items-baseline gap-3 border-y border-border py-5">
              <span className="font-display text-4xl font-semibold">
                £{service.priceGBP}
              </span>
              <span className="text-sm text-muted">
                · {service.durationMin} min · paid at booking
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-foreground/80">
              {service.blurb}
            </p>

            <div className="mt-6 text-xs uppercase tracking-[0.18em] text-muted">
              What's included
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-none text-accent"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l3.4 3.4 6.5-6.5a1 1 0 0 1 1.4 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-accent-soft p-4 text-xs leading-relaxed text-foreground/75">
              Secure card payment is collected at booking, processed by Stripe.
              Free cancellation up to 24 hours before your slot.
            </div>
          </div>
        </aside>

        <section>
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Pick a time
          </h2>
          <p className="mt-1 text-sm text-muted">
            Choose any free slot — payment is collected on the next step.
          </p>

          <div className="mt-6">
            {calLink ? (
              <BookingEmbed calLink={calLink} redirectUrl={redirectUrl} />
            ) : (
              <SetupRequired eventSlug={service.calEventSlug} />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function SetupRequired({ eventSlug }: { eventSlug: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-accent/50 bg-accent-soft/40 p-8">
      <div className="font-display text-xl font-semibold">
        One last step to make this booking widget live
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
        The site is wired up correctly — it just needs your Cal.com username so
        the embed knows which calendar to load.
      </p>

      <ol className="mt-5 space-y-3 text-sm leading-relaxed">
        <li>
          <span className="font-medium">1.</span> Create a free account at{" "}
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-accent underline-offset-2 hover:text-accent"
          >
            cal.com
          </a>{" "}
          and connect the Stripe app (in test mode).
        </li>
        <li>
          <span className="font-medium">2.</span> Create an event type with the
          slug <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">{eventSlug}</code>{" "}
          and enable the Stripe app on it with the correct GBP price.
        </li>
        <li>
          <span className="font-medium">3.</span> Add{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">
            NEXT_PUBLIC_CAL_USERNAME=your-cal-username
          </code>{" "}
          to <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">.env.local</code> and restart{" "}
          <code className="rounded bg-background px-1.5 py-0.5 font-mono text-xs">npm run dev</code>.
        </li>
      </ol>

      <p className="mt-5 text-xs text-muted">
        Full step-by-step is in the project README.
      </p>
    </div>
  );
}
