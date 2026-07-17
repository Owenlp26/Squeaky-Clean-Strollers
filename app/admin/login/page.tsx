"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from") ?? "/admin/calendar-setup";
  // Only allow internal admin redirects — never an attacker-supplied external URL.
  const from = fromParam.startsWith("/admin") ? fromParam : "/admin/calendar-setup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push(from);
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-6 py-24">
      <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "var(--gold)" }}>Admin</p>
      <h1 className="mt-3 font-display text-3xl" style={{ color: "var(--charcoal)" }}>Enter password</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          autoComplete="username"
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-foreground"
          style={{ borderColor: "var(--border-color)", background: "#fff" }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-foreground"
          style={{ borderColor: "var(--border-color)", background: "#fff" }}
        />
        {error && (
          <p className="text-sm text-red-600">Incorrect password.</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full py-3 text-sm font-medium transition-colors disabled:opacity-50"
          style={{ background: "var(--charcoal)", color: "var(--cream)" }}
        >
          {loading ? "Checking..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
