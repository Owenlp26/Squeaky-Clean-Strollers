export type ServiceItem = {
  id: string;
  name: string;
  priceGBP: number;
  pricePrefix?: string;
  turnaroundDays: number;
  durationHours: number;
  note?: string;
  isMonthly?: boolean;
};

export type ServiceCategory = {
  id: string;
  label: string;
  description?: string;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "buggies",
    label: "Buggies & Prams",
    description: "6 day max turnaround unless stated.",
    items: [
      { id: "single-buggy", name: "Single pram / buggy with detachable frame", priceGBP: 65, turnaroundDays: 6, durationHours: 5 },
      { id: "doona", name: "Doona", priceGBP: 38, turnaroundDays: 6, durationHours: 4 },
      { id: "foldable-pram", name: "Foldable / travel pram", priceGBP: 50, turnaroundDays: 6, durationHours: 5 },
      { id: "double-buggy", name: "Double pram / buggy with detachable frame", priceGBP: 80, turnaroundDays: 6, durationHours: 6 },
      { id: "double-foldable-buggy", name: "Double travel buggy (inc. Baby Jogger type)", priceGBP: 65, turnaroundDays: 6, durationHours: 6 },
      { id: "bassinet", name: "Bassinet only", priceGBP: 38, turnaroundDays: 6, durationHours: 4 },
      { id: "toddler-seat", name: "Toddler seat only", priceGBP: 38, turnaroundDays: 6, durationHours: 4 },
      { id: "frame-only", name: "Frame only", priceGBP: 20, turnaroundDays: 6, durationHours: 4 },
    ],
  },
  {
    id: "other",
    label: "Other Items",
    items: [
      { id: "car-seat", name: "Car seat", priceGBP: 35, turnaroundDays: 6, durationHours: 4 },
      { id: "travel-cot", name: "Travel cot / next to me crib", priceGBP: 38, turnaroundDays: 6, durationHours: 4 },
      { id: "high-chair", name: "High chair", priceGBP: 35, turnaroundDays: 6, durationHours: 4 },
      { id: "sleepyhead", name: "Sleepyhead / Dock-a-Tot", priceGBP: 30, turnaroundDays: 6, durationHours: 4 },
      { id: "changing-bag", name: "Changing bag", priceGBP: 15, turnaroundDays: 6, durationHours: 3 },
      { id: "footmuff", name: "Footmuff or cover", priceGBP: 10, turnaroundDays: 6, durationHours: 3 },
      { id: "soiled-mould-charge", name: "Heavily soiled / mould charge", priceGBP: 10, turnaroundDays: 6, durationHours: 0.5, note: "Per item, always confirmed before we proceed" },
      { id: "leather-pram-charge", name: "Leather pram clean charge", priceGBP: 10, turnaroundDays: 6, durationHours: 0.5, note: "For prams with mainly eco-leather / leather covering — specialised products are used for this clean" },
    ],
  },
  {
    id: "bundles",
    label: "Travel System Bundles",
    description: "Complete travel system cleans at a bundle price.",
    items: [
      {
        id: "bundle-full",
        name: "Full travel system: Frame, Bassinet, Toddler Seat, Car Seat + isofix base, Next to me crib & Changing Bag",
        priceGBP: 145,
        turnaroundDays: 6,
        durationHours: 8,
      },
      {
        id: "bundle-standard",
        name: "Standard travel system: Frame, Bassinet, Toddler Seat, Car Seat + isofix base & Changing Bag",
        priceGBP: 115,
        turnaroundDays: 6,
        durationHours: 6,
      },
      {
        id: "bundle-basic",
        name: "Basic travel system: Frame, Bassinet, Toddler Seat & Changing Bag",
        priceGBP: 95,
        turnaroundDays: 6,
        durationHours: 5,
      },
    ],
  },
  {
    id: "monthly",
    label: "Monthly Package",
    description: "Set up a recurring monthly clean. Pay £70/month.",
    items: [
      {
        id: "monthly-package",
        name: "Monthly Clean: car seat + single buggy (this includes all single pram clean options)",
        priceGBP: 70,
        turnaroundDays: 6,
        durationHours: 4,
        isMonthly: true,
        note: "Recurring £70/month, first payment taken today",
      },
    ],
  },
  {
    id: "emergency-addons",
    label: "Emergency / 24 hour service",
    items: [
      { id: "emergency-car-seat", name: "Emergency car seat clean", priceGBP: 50, turnaroundDays: 1, durationHours: 1.5, note: "24hr turnaround" },
      { id: "emergency-buggy", name: "Emergency buggy clean", priceGBP: 50, pricePrefix: "from", turnaroundDays: 1, durationHours: 2.5, note: "24hr turnaround. Contact Charlotte to arrange." },
    ],
  },
];

export const allServiceItems: ServiceItem[] = serviceCategories.flatMap((c) => c.items);

export function getServiceItemById(id: string): ServiceItem | undefined {
  return allServiceItems.find((item) => item.id === id);
}
