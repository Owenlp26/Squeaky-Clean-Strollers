"use client";

import { useState } from "react";

export function ConfirmForm({ bookingId, customerEmail }: { bookingId: string; customerEmail: string }) {
  const [slot, setSlot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, confirmedSlot: slot.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="font-display text-xl font-semibold">Slot confirmed.</p>
        <p className="mt-2 text-sm text-muted">Confirmation email sent to {customerEmail}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="slot" className="mb-2 block text-sm font-medium">Confirmed drop-off slot</label>
        <input
          id="slot"
          type="text"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          placeholder="e.g. Tuesday 10 June at 2pm"
          required
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent"
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting || !slot.trim()}
        className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent disabled:opacity-50"
      >
        {submitting ? "Sending..." : "Send confirmation to customer"}
      </button>
    </form>
  );
}
