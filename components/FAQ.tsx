const faqs = [
  {
    q: "Do you collect and return?",
    a: "Yes — collection and return is free within Zones 1–3. £10 each way for Zones 4–6. We give you a 1-hour collection window the morning of.",
  },
  {
    q: "What cleaning products do you use?",
    a: "Non-toxic, fragrance-free and baby-safe. We use a hospital-grade steam sanitiser (no chemical residue) for the final pass on every clean.",
  },
  {
    q: "Will the fabric still be wet when I get it back?",
    a: "No. We have a 48-hour dry guarantee. Every pram goes through our dehumidified drying room before it leaves the workshop.",
  },
  {
    q: "Do you work on second-hand prams?",
    a: "Yes — our Newborn-Ready Detail is built exactly for this. We disassemble, deep-clean every crevice and re-grease bearings.",
  },
  {
    q: "What if I need to reschedule?",
    a: "Reschedule for free up to 24 hours before. Inside 24 hours we keep a £15 admin fee; the rest is refunded automatically.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">FAQ</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Things people ask.
        </h2>
      </div>
      <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
        {faqs.map((f) => (
          <details key={f.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-display text-lg font-medium">{f.q}</span>
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border text-muted transition-transform group-open:rotate-45">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1Z" />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
