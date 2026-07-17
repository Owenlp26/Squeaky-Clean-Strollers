import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingBookButton } from "@/components/FloatingBookButton";

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

// Nonce-based CSP (see middleware.ts) requires per-request rendering: a fresh
// nonce only exists at request time, so pages can't be statically prerendered.
// This forces dynamic rendering across every route under the root layout.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Squeaky Clean Strollers | East Renfrewshire's pram cleaning specialists",
  description:
    "Premium hand-cleaning and sanitising for prams, buggies and travel systems. Drop off in East Renfrewshire, restored and returned to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingBookButton />
      </body>
    </html>
  );
}
