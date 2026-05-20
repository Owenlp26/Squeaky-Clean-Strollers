export type Service = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  durationMin: number;
  priceGBP: number;
  calEventSlug: string;
  features: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "express-refresh",
    name: "Express Refresh",
    tagline: "A quick spruce-up between adventures",
    blurb:
      "Spot-clean of the seat and harness, wheel degrease, and a sanitising wipe-down. Same-day turnaround.",
    durationMin: 30,
    priceGBP: 35,
    calEventSlug: "express-refresh-30",
    features: [
      "Spot-clean seat & harness",
      "Wheel degrease",
      "Surface sanitise",
      "Same-day turnaround",
    ],
  },
  {
    slug: "standard-clean",
    name: "Standard Clean",
    tagline: "Our most-loved monthly clean",
    blurb:
      "Full hand wash of the fabric, frame polish, wheel service and a steam sanitise. Smells (and looks) like new.",
    durationMin: 60,
    priceGBP: 55,
    calEventSlug: "standard-clean-60",
    features: [
      "Full fabric hand wash",
      "Frame polish",
      "Wheel & bearing service",
      "Steam sanitise",
    ],
  },
  {
    slug: "deep-clean",
    name: "Deep Clean & Sanitise",
    tagline: "Most popular",
    blurb:
      "Seat is fully removed, deep-washed and dried. Frame is degreased and polished. Steam sanitise to NHS-grade. Pet-hair extraction included.",
    durationMin: 90,
    priceGBP: 85,
    calEventSlug: "30min",
    features: [
      "Full seat removal & deep wash",
      "Frame degrease & polish",
      "NHS-grade steam sanitise",
      "Pet-hair extraction",
      "48-hour drying guarantee",
    ],
    featured: true,
  },
  {
    slug: "newborn-ready",
    name: "Newborn-Ready Detail",
    tagline: "For pre-loved prams entering a new home",
    blurb:
      "Our full restoration. Disassembled, hand-cleaned in every crevice, hospital-grade sanitised, bearings re-greased and a fresh-fabric finish.",
    durationMin: 120,
    priceGBP: 125,
    calEventSlug: "newborn-ready-120",
    features: [
      "Complete disassembly & detail",
      "Hospital-grade sanitise",
      "Bearings re-greased",
      "Fresh-fabric finish",
      "Photo report on completion",
      "Two-week aftercare guarantee",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
