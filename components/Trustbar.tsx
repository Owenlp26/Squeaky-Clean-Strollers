const featured = ["Time Out", "Mother & Baby", "Hackney Citizen", "Bugaboo", "iCandy"];

export function Trustbar() {
  return (
    <section className="border-y border-border/60 bg-card/60">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-foreground/70">As featured in</span>
          {featured.map((name) => (
            <span key={name} className="font-display text-base normal-case tracking-tight">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
