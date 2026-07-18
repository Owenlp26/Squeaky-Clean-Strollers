const items = [
  "Sparkling clean, every single time",
  "No judgement service",
  "Safe for your little one, always",
  "Back with you in 6 days",
  "Trusted by local families",
  "Based in East Renfrewshire",
];

export function Trustbar() {
  return (
    <div
      className="overflow-hidden py-4"
      style={{
        background: "var(--gold)",
        borderTop: "none",
        borderBottom: "none",
      }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-8 text-xs uppercase tracking-[0.22em]"
            style={{ color: "#ffffff" }}
          >
            {item}
            <span
              className="inline-block h-px w-5 flex-shrink-0"
              style={{ background: "rgba(42,40,37,0.4)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
