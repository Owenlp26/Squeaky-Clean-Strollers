"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What baby items do you clean?",
    a: "Pretty much everything! Car seats, single and double prams and buggies, foldable and travel prams, Doonas, running buggies, bassinets, toddler seats, travel cots, next to me cribs, high chairs, baby bouncers, Sleepyheads, DockATots, changing bags, footmuffs and covers. If your item is not listed just get in touch and we will let you know if we can help.",
  },
  {
    q: "How long will my items take to be ready?",
    a: "We know you cannot be without your baby items for long so we work as quickly as possible to get them back to you sparkling clean. Most items are ready within 4 days and car seats and Doonas within 2 days. Need it back sooner? Just ask about our 24-hour emergency clean, available for car seats from £45 and buggies from £48.",
  },
  {
    q: "What products do you use and are they safe for my baby?",
    a: "Everything we use is baby-safe, non-toxic and fragrance-free, always. We would never use anything on your items that we would not be happy using on our own and every item is fully dried before collection so it comes back to you sparkling clean and completely dry.",
  },
  {
    q: "Do I need to do anything before I drop off?",
    a: "Absolutely not! Just bring your items exactly as they are, no cleaning, no preparation and no disassembly needed. We handle everything from start to finish including taking items apart and putting them back together where needed. Just drop off and leave the rest completely to us.",
  },
  {
    q: "What happens if my item is heavily soiled or has mould?",
    a: "In some cases where items are heavily soiled or mould is present a small additional charge of £8 per item may apply. We will always assess your item on arrival and let you know before we proceed so you are never hit with any unexpected costs. Whatever state your items are in there is absolutely no judgement from us.",
  },
  {
    q: "How does the booking process work?",
    a: "Booking is really simple! Head to our booking page, choose your service, pick a date and time that works for you and pay your deposit to secure your slot. Once you are booked in we will be in touch to confirm your drop off time and answer any questions you have. That is it, everything else is taken care of from there.",
  },
  {
    q: "Is a deposit required to book?",
    a: "A 25% deposit is required at the time of booking to secure your slot. The remaining balance is then due when you collect your sparkling clean items. Simple and straightforward with no hidden costs.",
  },
  {
    q: "I am selling my baby items, can you help?",
    a: "Absolutely! Getting your baby items professionally cleaned before selling them is one of the best things you can do to increase their value and make them much more appealing to buyers. A sparkling clean item will always sell faster and for a better price than one that has not been cleaned. Just book in as normal and we will get everything looking incredible for you.",
  },
  {
    q: "Do you work with nurseries and childminders?",
    a: "Yes absolutely and we would love to hear from you! We work with childminders and nurseries across East Renfrewshire offering regular scheduled cleans to keep your equipment consistently clean, safe and looking professional. Get in touch to find out more about our childminder and nursery packages.",
  },
  {
    q: "What if I need to cancel or reschedule my booking?",
    a: "Life happens and we totally get that! If you need to change or cancel your booking just drop us a message as soon as you can and we will do everything we can to help. Deposits are non-refundable but we are always happy to transfer them to a new date where possible.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      className="border-b"
      style={{ borderColor: "var(--border-color)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 py-7 text-left"
        aria-expanded={open}
      >
        <span
          className="font-display text-xl leading-snug sm:text-2xl"
          style={{ color: "var(--charcoal)" }}
        >
          {q}
        </span>
        <span
          className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border transition-all duration-300"
          style={{
            borderColor: open ? "var(--charcoal)" : "var(--border-color)",
            color: open ? "var(--charcoal)" : "var(--taupe)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M10 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H5a1 1 0 1 1 0-2h4V5a1 1 0 0 1 1-1Z" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pb-7 pr-12 text-base leading-relaxed"
              style={{ color: "var(--taupe)" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section
      id="faq"
      className="py-24"
      style={{ background: "var(--gold-soft)" }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2
            className="font-display leading-tight tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)", color: "var(--charcoal)" }}
          >
            Things people ask.
          </h2>
        </motion.div>

        <div className="border-t" style={{ borderColor: "var(--border-color)" }}>
          {faqs.map((f, i) => (
            <FAQItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
