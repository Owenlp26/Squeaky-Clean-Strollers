import { Hero } from "@/components/Hero";
import { Trustbar } from "@/components/Trustbar";
import { ServiceCard } from "@/components/ServiceCard";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { services } from "@/data/services";

export default function Home() {
  return (
    <>
      <Hero />
      <Trustbar />

      <section id="services" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Services</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Pick the level of clean.
          </h2>
          <p className="mt-4 text-base text-muted">
            Every service includes collection, return and a baby-safe steam
            sanitise. Prices include everything — no surprises.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <HowItWorks />
      <FAQ />

      <section className="mx-auto mb-20 max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-8 py-14 text-background sm:px-12 sm:py-16">
          <div className="relative z-10 max-w-xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Got an unusual pram? We've probably cleaned it.
            </h2>
            <p className="mt-3 text-base text-background/85">
              From Silver Cross prams to triple buggies — drop us a line and
              we'll quote you back the same day.
            </p>
            <a
              href="mailto:hello@wheelandwash.co"
              className="mt-6 inline-flex items-center rounded-full bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-background/90"
            >
              Email us
            </a>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-background/15 blur-3xl"
          />
        </div>
      </section>
    </>
  );
}
