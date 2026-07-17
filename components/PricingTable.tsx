"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { serviceCategories } from "@/data/services";

const NON_BOOKABLE = new Set(["emergency-car-seat", "emergency-buggy", "soiled-mould-charge"]);

function PriceRow({ item, index }: { item: (typeof serviceCategories)[0]["items"][0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const router = useRouter();
  const bookable = !NON_BOOKABLE.has(item.id);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onClick={() => bookable && router.push(`/book?items=${item.id}`)}
      className="flex items-baseline justify-between gap-6 py-4 transition-colors duration-150"
      style={{
        borderBottom: "1px solid rgba(42,40,37,0.08)",
        cursor: bookable ? "pointer" : "default",
      }}
      onMouseEnter={(e) => { if (bookable) (e.currentTarget as HTMLElement).style.background = "rgba(168,154,90,0.06)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = ""; }}
    >
      <div className="min-w-0">
        <span className="text-sm" style={{ color: "var(--charcoal)" }}>{item.name}</span>
        {item.note && (
          <span className="ml-2 text-xs" style={{ color: "var(--taupe)" }}>{item.note}</span>
        )}
        {bookable && (
          <span className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gold)" }}>Book →</span>
        )}
      </div>
      <div className="flex items-baseline gap-4 shrink-0">
        <span className="text-xs tabular-nums" style={{ color: "var(--taupe)" }}>
          {item.turnaroundDays === 1 ? "24 hrs" : `${item.turnaroundDays} days`}
        </span>
        <span className="font-display text-xl tabular-nums" style={{ color: "var(--charcoal)", fontWeight: 400, minWidth: "3.5rem", textAlign: "right" }}>
          {item.pricePrefix ? <span className="text-sm mr-1" style={{ color: "var(--taupe)" }}>{item.pricePrefix}</span> : null}£{item.priceGBP}{item.isMonthly ? <span className="text-sm" style={{ color: "var(--taupe)" }}>pm</span> : null}
        </span>
      </div>
    </motion.div>
  );
}

export function PricingTable() {
  return (
    <div className="space-y-12">
      {serviceCategories.map((cat) => (
        <div key={cat.id}>
          <div className="mb-1 pb-3" style={{ borderBottom: "2px solid var(--charcoal)" }}>
            <h3 className="text-base font-medium uppercase tracking-[0.2em]" style={{ color: "var(--charcoal)" }}>
              {cat.label}
            </h3>
            {cat.description && (
              <p className="mt-1 text-xs" style={{ color: "var(--taupe)" }}>{cat.description}</p>
            )}
          </div>
          <div>
            {cat.items.map((item, i) => (
              <PriceRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
