import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About | Squeaky Clean Strollers",
  description: "Meet Charlotte, the baby equipment cleaning specialist behind Squeaky Clean Strollers, based in East Renfrewshire.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Meet Charlotte — charcoal */}
      <div className="px-6 py-24 lg:py-32" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl" style={{ color: "#ffffff" }}>
              Meet the founder, Charlotte.
            </h1>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_420px] lg:items-start">
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "rgba(253,250,244,0.8)" }}>
              <p>
                Meet Charlotte, a baby equipment cleaning specialist, wife and mum based in Glasgow and East Renfrewshire.
              </p>
              <p>
                Charlotte&apos;s story started after she had her daughter Harper. Like so many new mums she found herself battling postpartum depression and anxiety while trying to keep on top of everything that comes with new parenthood. The never-ending to-do list, the sleepless nights, the constant feeling of falling behind no matter how hard you try.
              </p>
              <p>
                She was already struggling and on top of everything else she could not find a single person in her local area who could clean her buggy or car seat. Something that felt so simple just did not exist and she knew she could not be the only mum who needed it.
              </p>
              <p style={{ fontWeight: 500, color: "rgba(253,250,244,0.95)" }}>So she decided to do something about it.</p>
              <p>
                Charlotte built Squeaky Clean Strollers from scratch because she lived this exact experience herself and knew there were so many other parents out there carrying the same load. As a busy working mum she knows exactly what it feels like to have a never-ending to-do list, zero spare time and things constantly slipping through the cracks. She knows the guilt of walking past the buggy every day knowing it needs sorting. She knows the mental load of trying to keep everything together and she knows how much it means to have someone take one thing completely off your plate without any judgement.
              </p>
              <p style={{ fontWeight: 500, color: "rgba(253,250,244,0.95)" }}>That is exactly why she built this business.</p>
              <p>
                Since launching Squeaky Clean Strollers Charlotte has helped families across Glasgow and East Renfrewshire cross this one off their list for good and she is just getting started. Every single item she cleans gets the same level of care and attention because your standards are her standards and your little one deserves nothing less.
              </p>
              <p>
                Outside of work Charlotte loves spending time with her family, travelling whenever she gets the chance and socialising with her friends. Life is full, busy and wonderful and she would not have it any other way.
              </p>
            </div>

            {/* Charlotte photos */}
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/charlotte.jpg"
                  alt="Charlotte, founder of Squeaky Clean Strollers"
                  width={420}
                  height={280}
                  className="h-[320px] w-full object-cover object-center"
                />
              </div>
              <div className="overflow-hidden rounded-2xl">
                <Image
                  src="/charlotte-working.jpg"
                  alt="Charlotte at work cleaning baby gear"
                  width={420}
                  height={520}
                  className="h-[320px] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission — gold-soft */}
      <div className="px-6 py-20" style={{ background: "var(--gold-soft)" }}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl mb-10">
            <h2 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl" style={{ color: "var(--charcoal)" }}>
              Beyond cleaning your items, it&apos;s about giving your time back.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed max-w-3xl" style={{ color: "var(--taupe)" }}>
            <p>
              We are based in East Renfrewshire, serving families across Glasgow and the surrounding area. We exist for one simple reason: to save parents, grandparents, nannies, childminders and caregivers precious time by professionally cleaning the baby equipment their little ones use every single day so they do not have to.
            </p>
            <p>
              Our mission goes beyond just cleaning baby equipment. It is about giving busy parents their time back, reducing the mental load that comes with parenthood and making sure that every single family who comes to us leaves feeling lighter, calmer and more organised. Every parent deserves to feel on top of things and every little one deserves to be in equipment that is truly clean, not just clean-looking.
            </p>
            <p>
              Because the truth is that buggy, car seat, travel cot or high chair your little one uses every single day collects bacteria, grime and buildup in all the places you cannot see and definitely cannot reach with a baby wipe. The harness straps, the buckles, the fabric folds, the crevices that a wipe simply cannot get into. Over time this builds up quietly and most parents do not even know it is there until someone like us takes a proper look.
            </p>
            <p>
              We clean everything your little one uses. Car seats, single and double prams and buggies, foldable and travel prams, Doonas, running buggies, travel cots, next to me cribs, high chairs, baby bouncers, Sleepyheads, DockATots, changing bags, footmuffs and covers. Every single item is given a full professional deep clean from top to bottom using baby-safe, non-toxic products throughout, fully dried and handed back to you sparkling clean, sanitised and genuinely fresh.
            </p>
            <p>
              We are thorough, reliable and dependable and we are just getting started. Charlotte built this business with one simple goal: to help as many families across Glasgow and East Renfrewshire as possible take this completely off their plate for good.
            </p>
          </div>
        </div>
      </div>

      {/* CTA — charcoal */}
      <div className="px-6 py-20 text-center" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-2xl" style={{ fontWeight: 500, color: "#ffffff" }}>Ready to get started?</h2>
          <p className="mt-3" style={{ color: "rgba(253,250,244,0.6)" }}>Get in touch and we&apos;ll confirm your slot quickly.</p>
          <Link
            href="/book"
            className="mt-6 inline-flex rounded-full px-8 py-3 text-sm font-medium transition-colors"
            style={{ background: "var(--gold)", color: "var(--charcoal)" }}
          >
            Book in
          </Link>
        </div>
      </div>
    </div>
  );
}
