import Link from "next/link";
import type { Service } from "@/data/services";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`group relative flex flex-col rounded-3xl border bg-card p-7 transition-all ${
        service.featured
          ? "border-accent shadow-[0_30px_60px_-20px_rgba(122,139,122,0.35)]"
          : "border-border hover:border-accent/60 hover:shadow-sm"
      }`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-background">
          {service.tagline}
        </span>
      )}

      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl font-semibold">{service.name}</h3>
        <div className="text-right">
          <div className="font-display text-3xl font-semibold">
            £{service.priceGBP}
          </div>
          <div className="text-xs text-muted">{service.durationMin} min</div>
        </div>
      </div>

      {!service.featured && (
        <p className="mt-1 text-sm text-muted">{service.tagline}</p>
      )}

      <p className="mt-4 text-sm leading-relaxed text-foreground/80">
        {service.blurb}
      </p>

      <ul className="mt-5 space-y-2 text-sm">
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

      <Link
        href={`/book/${service.slug}`}
        className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
          service.featured
            ? "bg-foreground text-background hover:bg-accent"
            : "border border-border bg-background text-foreground hover:border-accent hover:text-accent"
        }`}
      >
        Book {service.name}
        <svg
          className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 1 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </article>
  );
}
