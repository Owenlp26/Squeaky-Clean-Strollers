"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import type { ServiceCategory, ServiceItem } from "@/data/services";
import type { AvailabilitySlot } from "@/app/api/availability/route";

type Step = 1 | 2 | 3 | 4;

export function BookingFlow({ categories }: { categories: ServiceCategory[] }) {
  const searchParams = useSearchParams();
  const allItems = categories.flatMap((c) => c.items);

  const [step, setStep] = useState<Step>(1);
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const ids = searchParams.get("items")?.split(",").filter(Boolean) ?? [];
    const q: Record<string, number> = {};
    for (const id of ids) {
      if (allItems.some((i) => i.id === id)) q[id] = (q[id] ?? 0) + 1;
    }
    return q;
  });
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
  const [payInFull, setPayInFull] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsLoaded, setSlotsLoaded] = useState(false);

  const qtyOf = (id: string) => quantities[id] ?? 0;
  const selectedItems = allItems.filter((i) => qtyOf(i.id) > 0);
  const totalUnits = selectedItems.reduce((s, i) => s + qtyOf(i.id), 0);
  const total = selectedItems.reduce((s, i) => s + i.priceGBP * qtyOf(i.id), 0);
  const isMonthlyBooking = selectedItems.some((i) => i.isMonthly);
  const deposit = isMonthlyBooking ? total : Math.ceil(total * 0.25);
  const totalDuration = selectedItems.reduce((s, i) => s + (i.durationHours ?? 0) * qtyOf(i.id), 0);
  const hasEmergency = selectedItems.some((i) => i.id === "emergency-buggy");

  function setItemQty(item: ServiceItem, n: number) {
    const next = Math.max(0, Math.min(10, n));
    setQuantities((prev) => {
      const copy = { ...prev };
      if (next <= 0) delete copy[item.id];
      else copy[item.id] = next;
      return copy;
    });
  }

  useEffect(() => {
    if (step !== 2 || slotsLoaded || totalDuration <= 0) return;
    setSlotsLoading(true);
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 180); // ~6 months ahead (server caps at MAX_RANGE_DAYS)
    fetch(
      `/api/availability?from=${from.toISOString().slice(0, 10)}&to=${to.toISOString().slice(0, 10)}&durationHours=${totalDuration}`
    )
      .then((r) => r.json())
      .then((data) => {
        setAvailableSlots(data.slots ?? []);
        setSlotsLoaded(true);
      })
      .catch(() => setSlotsLoaded(true))
      .finally(() => setSlotsLoading(false));
  }, [step, slotsLoaded, totalDuration]);

  // Scroll back to the top of the booking flow when the step changes, so mobile
  // users don't land at the bottom of the page after tapping "Next". We compute
  // the target position after the new step has painted (via rAF) and use
  // window.scrollTo — scrollIntoView alone was unreliable because collapsing a
  // tall step into a short one lets the browser clamp the scroll to the footer.
  const topRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const scrollToTop = () => {
      const el = topRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 80; // header offset
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    };
    // Two frames: let the new step render + the page height settle first.
    requestAnimationFrame(() => requestAnimationFrame(scrollToTop));
  }, [step]);

  // Reset slot selection if user goes back and changes items or quantities
  useEffect(() => {
    setSelectedSlot(null);
    setSlotsLoaded(false);
    setAvailableSlots([]);
  }, [quantities]);

  async function handleSubmit() {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerPhone: phone,
          customerEmail: email,
          itemIds: selectedItems.flatMap((i) => Array(qtyOf(i.id)).fill(i.id)),
          availability: selectedSlot ? [selectedSlot.label] : [],

          availabilityNotes: notes || undefined,
          selectedSlot: selectedSlot ?? undefined,
          isSubscription: isMonthlyBooking,
          payInFull: !isMonthlyBooking && payInFull,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }
      const data = await res.json();
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const steps = ["Items", "Date", "Details", "Confirm"];

  return (
    <div ref={topRef} className="scroll-mt-24">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => {
          const n = (i + 1) as Step;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${active ? "bg-foreground text-background" : done ? "bg-accent text-background" : "bg-card border border-border text-muted"}`}>
                {done ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M13.5 4a.75.75 0 0 1 0 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06L7.5 9 12.44 4a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                  </svg>
                ) : n}
              </div>
              <span className={`text-sm ${active ? "font-medium text-foreground" : "text-muted"} hidden sm:inline`}>{label}</span>
              {i < steps.length - 1 && <div className="ml-1 h-px w-6 bg-border" />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Items */}
      {step === 1 && (
        <div>
          <h2 className="font-display text-2xl">What needs cleaning?</h2>
          <p className="mt-1 text-sm text-muted">Select everything you want cleaned in this booking.</p>
          <div className="mt-6 space-y-8">
            {categories.map((cat) => (
              <div key={cat.id}>
                <h3 className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">{cat.label}</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {cat.items.map((item) => {
                    const q = qtyOf(item.id);
                    const selected = q > 0;
                    const isEmergency = item.id === "emergency-buggy";
                    // Quantity stepper only for standard bookable items (not the
                    // monthly package or contact-only emergency cleans).
                    const showStepper = selected && !item.isMonthly && !isEmergency;
                    return (
                      <div
                        key={item.id}
                        onClick={() => { if (!selected) setItemQty(item, 1); }}
                        role={!selected ? "button" : undefined}
                        tabIndex={!selected ? 0 : undefined}
                        onKeyDown={!selected ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setItemQty(item, 1); } } : undefined}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${selected ? "border-accent bg-accent-soft" : "border-border bg-card hover:border-accent/50 cursor-pointer"}`}
                      >
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.note && <div className="text-xs text-muted">{item.note}</div>}
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0 pl-3">
                          <span className="font-display font-semibold">£{item.priceGBP}</span>
                          {showStepper ? (
                            <div className="flex items-center gap-2">
                              <button type="button" aria-label={`Decrease ${item.name}`} onClick={(e) => { e.stopPropagation(); setItemQty(item, q - 1); }} className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-base leading-none hover:border-accent">−</button>
                              <span className="w-4 text-center font-medium tabular-nums">{q}</span>
                              <button type="button" aria-label={`Increase ${item.name}`} disabled={q >= 10} onClick={(e) => { e.stopPropagation(); setItemQty(item, q + 1); }} className="flex h-6 w-6 items-center justify-center rounded-full border border-border text-base leading-none hover:border-accent disabled:opacity-40">+</button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              aria-label={selected ? `Remove ${item.name}` : `Add ${item.name}`}
                              onClick={(e) => { e.stopPropagation(); setItemQty(item, selected ? 0 : 1); }}
                              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${selected ? "border-accent bg-accent text-background" : "border-border"}`}
                            >
                              {selected && (
                                <svg viewBox="0 0 12 12" fill="currentColor" className="h-3 w-3">
                                  <path fillRule="evenodd" d="M10.5 3a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L5.5 7 9.44 3a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div className="mt-6 rounded-xl border border-border bg-card p-4 text-sm">
              <div className="flex items-center justify-between font-medium">
                <span>{totalUnits} item{totalUnits !== 1 ? "s" : ""} selected</span>
                <span>Total: £{total}{isMonthlyBooking ? "/month" : ""}</span>
              </div>
              {isMonthlyBooking
                ? <div className="mt-1 text-xs text-muted">Recurring £{total}/month, first payment taken today</div>
                : <div className="mt-1 text-xs text-muted">25% deposit today: £{deposit}</div>
              }
            </div>
          )}

          {hasEmergency && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm">
              <p className="font-medium text-amber-900">Emergency cleans can't be booked online</p>
              <p className="mt-1 text-amber-800">For 24-hour turnaround, please contact Charlotte directly to check availability and arrange your clean.</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <a
                  href="https://wa.me/447344279177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors"
                  style={{ background: "var(--charcoal)", color: "var(--cream)" }}
                >
                  WhatsApp or Message 07344279177
                </a>
                <a
                  href="mailto:charlotte@squeakycleanstrollers.com"
                  className="inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium transition-colors"
                  style={{ borderColor: "var(--border-color)", color: "var(--taupe)" }}
                >
                  Email Charlotte
                </a>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={selectedItems.length === 0 || hasEmergency}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-40"
            >
              Next: Pick a date
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Date picker */}
      {step === 2 && (
        <div>
          <h2 className="font-display text-2xl">Choose a date</h2>
          <p className="mt-1 text-sm text-muted">
            Select an available date. Charlotte will confirm the exact drop-off time with you directly.
          </p>

          {slotsLoading ? (
            <div className="mt-8 text-sm text-muted">Loading available dates...</div>
          ) : availableSlots.length === 0 ? (
            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-border bg-card p-6 text-sm">
                <p className="font-medium">No dates available right now.</p>
                <p className="mt-1 text-muted">Please get in touch with Charlotte directly to arrange a date.</p>
                <a
                  href="tel:+447344279177"
                  className="mt-4 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-accent"
                >
                  Call 07344 279177
                </a>
              </div>
              {process.env.NODE_ENV === "development" && (
                <div className="rounded-xl border border-dashed border-amber-400 bg-amber-50 p-4 text-sm">
                  <p className="font-medium text-amber-800">Dev mode — no Google Calendar connected</p>
                  <p className="mt-1 text-amber-700">Use a test date to proceed through the payment flow.</p>
                  <button
                    type="button"
                    onClick={() => setSelectedSlot({ date: "2026-07-14", label: "Mon 14 Jul" })}
                    className="mt-3 rounded-full bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
                  >
                    Use test date: Mon 14 Jul
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {availableSlots.map((slot) => {
                const isSelected = selectedSlot?.date === slot.date;
                return (
                  <button
                    key={slot.date}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${
                      isSelected
                        ? "border-accent bg-accent text-background"
                        : "border-border bg-card hover:border-accent hover:text-accent"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          )}

          {selectedSlot && (
            <div className="mt-6 rounded-xl border border-accent bg-accent-soft p-4 text-sm">
              <div className="font-medium text-accent">Selected: {selectedSlot.label}</div>
              <div className="mt-0.5 text-xs text-muted">Charlotte will confirm your drop-off time directly.</div>
            </div>
          )}

          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium" htmlFor="notes">
              Anything else? <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent resize-none"
              placeholder="e.g. Pram has a mould patch on the seat"
            />
          </div>

          <div className="mt-6 flex gap-3 justify-between">
            <button onClick={() => setStep(1)} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent">Back</button>
            <button
              onClick={() => setStep(3)}
              disabled={!selectedSlot}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-40"
            >
              Next: Your details
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div>
          <h2 className="font-display text-2xl">Your details</h2>
          <p className="mt-1 text-sm text-muted">Charlotte will use these to arrange your drop-off time.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="name">Name</label>
              <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="phone">Mobile number</label>
              <input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent" placeholder="07xxx xxxxxx" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium" htmlFor="email">Email</label>
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent" placeholder="you@example.com" />
            </div>
          </div>
          <div className="mt-6 flex gap-3 justify-between">
            <button onClick={() => setStep(2)} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent">Back</button>
            <button
              onClick={() => setStep(4)}
              disabled={!name || !phone || !email}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-40"
            >
              Review booking
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div>
          <h2 className="font-display text-2xl">Review your booking</h2>
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-[0.15em] text-muted mb-3">Items</div>
              {selectedItems.map((item) => (
                <div key={item.id} className="flex justify-between py-1.5 text-sm">
                  <span>{item.name}{qtyOf(item.id) > 1 ? ` ×${qtyOf(item.id)}` : ""}</span>
                  <span className="font-medium">£{item.priceGBP * qtyOf(item.id)}</span>
                </div>
              ))}
              <div className="mt-3 border-t border-border pt-3 flex justify-between text-sm font-semibold">
                <span>Total</span>
                <span>£{total}{isMonthlyBooking ? "/month" : ""}</span>
              </div>
              {isMonthlyBooking ? (
                <div className="mt-1 flex justify-between text-sm text-accent">
                  <span>Recurring monthly subscription</span>
                  <span>£{total}/month</span>
                </div>
              ) : (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="mb-2 text-xs uppercase tracking-[0.15em] text-muted">How would you like to pay?</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPayInFull(false)}
                      className={`rounded-xl border px-3 py-3 text-left transition-colors ${!payInFull ? "border-accent bg-accent-soft" : "border-border bg-card hover:border-accent/50"}`}
                    >
                      <div className="text-sm font-medium">25% deposit now</div>
                      <div className="font-display text-lg font-semibold">£{deposit}</div>
                      <div className="text-xs text-muted">£{total - deposit} on collection</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayInFull(true)}
                      className={`rounded-xl border px-3 py-3 text-left transition-colors ${payInFull ? "border-accent bg-accent-soft" : "border-border bg-card hover:border-accent/50"}`}
                    >
                      <div className="text-sm font-medium">Pay in full now</div>
                      <div className="font-display text-lg font-semibold">£{total}</div>
                      <div className="text-xs text-muted">Nothing on collection</div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {selectedSlot && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-[0.15em] text-muted mb-3">Booked slot</div>
                <div className="text-sm font-medium">{selectedSlot.label}</div>
                <p className="mt-2 text-xs text-muted">Charlotte will contact you to confirm a drop-off time.</p>
              </div>
            )}

            {notes && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-xs uppercase tracking-[0.15em] text-muted mb-2">Notes</div>
                <div className="text-sm text-muted">{notes}</div>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="text-xs uppercase tracking-[0.15em] text-muted mb-3">Contact</div>
              <div className="text-sm">{name}</div>
              <div className="text-sm text-muted">{phone} · {email}</div>
            </div>
          </div>

          {isMonthlyBooking
            ? <p className="mt-4 text-xs text-muted">By continuing, you&apos;ll start a recurring subscription of £{total}/month. Your first payment is taken today and you&apos;ll be billed monthly. Charlotte will be in touch to arrange drop-off each month.</p>
            : payInFull
              ? <p className="mt-4 text-xs text-muted">By continuing, you&apos;ll pay the full £{total} now to secure your slot. Nothing is due on collection.</p>
              : <p className="mt-4 text-xs text-muted">By continuing, you&apos;ll pay a £{deposit} deposit (25%) to secure your slot. The remainder of £{total - deposit} is due on collection.</p>
          }

          {/* Disclaimer */}
          <label className="mt-4 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={disclaimerAccepted}
              onChange={(e) => setDisclaimerAccepted(e.target.checked)}
              className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-border accent-foreground"
            />
            <span className="text-xs text-muted leading-relaxed">
              I have read and agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="underline underline-offset-2"
                style={{ color: "var(--gold)" }}
              >
                Terms &amp; Conditions
              </a>
              , and understand that Squeaky Clean Strollers does not accept liability for the safety of items cleaned. It is my responsibility to read and follow the manufacturer&apos;s guidelines for my items.
            </span>
          </label>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          <div className="mt-5 flex gap-3 justify-between">
            <button onClick={() => setStep(3)} className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent">Back</button>
            <button
              onClick={handleSubmit}
              disabled={submitting || !disclaimerAccepted}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-60"
            >
              {submitting ? "Sending..." : isMonthlyBooking ? "Start subscription" : payInFull ? `Pay £${total} & confirm` : `Pay £${deposit} deposit & confirm`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
