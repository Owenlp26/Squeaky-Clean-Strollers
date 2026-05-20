const steps = [
  {
    n: "01",
    title: "Book a slot",
    body: "Pick a service, choose a collection window that fits, pay securely online.",
  },
  {
    n: "02",
    title: "We collect",
    body: "Our team turns up at the agreed time, inspects the pram and takes it to our workshop.",
  },
  {
    n: "03",
    title: "Hand-restored",
    body: "Hand-washed, steam-sanitised and finished. Photos of the work emailed to you.",
  },
  {
    n: "04",
    title: "Returned dry",
    body: "Back at your door within 48 hours, fully dried and ready to roll.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">How it works</p>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Four steps. Zero faff.
        </h2>
      </div>
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="font-display text-sm text-accent">{s.n}</div>
            <h3 className="mt-2 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
