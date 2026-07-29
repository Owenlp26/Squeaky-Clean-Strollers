const items = [
  "Sparkling clean, every single time",
  "Non-judgemental service",
  "Safe for your little one, always",
  "Back with you in 6 days",
  "Trusted by local families",
  "Covering Glasgow and surrounding areas",
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
        {/* Four copies so the track always exceeds viewport width; the -50%
            translate loops seamlessly because copies are identical. */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
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
