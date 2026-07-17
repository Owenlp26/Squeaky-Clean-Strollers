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
      { id: "single-buggy", name: "Single pram / buggy with detachable frame", priceGBP: 42, turnaroundDays: 6, durationHours: 2.5 },
      { id: "doona", name: "Doona", priceGBP: 35, turnaroundDays: 2, durationHours: 2, note: "2 day max turnaround" },
      { id: "foldable-pram", name: "Foldable / travel pram", priceGBP: 38, turnaroundDays: 6, durationHours: 2 },
      { id: "double-buggy", name: "Double pram / buggy with detachable frame", priceGBP: 60, turnaroundDays: 6, durationHours: 3.5 },
      { id: "double-foldable-buggy", name: "Double travel buggy (inc. Baby Jogger type)", priceGBP: 55, turnaroundDays: 6, durationHours: 3 },
      { id: "icandy", name: "iCandy pram: frame, bassinet & toddler seat", priceGBP: 48, turnaroundDays: 6, durationHours: 3 },
      { id: "bassinet", name: "Bassinet only", priceGBP: 30, turnaroundDays: 6, durationHours: 1.5 },
      { id: "toddler-seat", name: "Toddler seat only", priceGBP: 30, turnaroundDays: 6, durationHours: 1.5 },
      { id: "frame-only", name: "Frame only", priceGBP: 20, turnaroundDays: 6, durationHours: 1 },
    ],
  },
  {
    id: "other",
    label: "Other Items",
    items: [
      { id: "car-seat", name: "Car seat", priceGBP: 35, turnaroundDays: 2, durationHours: 1.5, note: "2 day max turnaround" },
      { id: "travel-cot", name: "Travel cot / next to me crib", priceGBP: 30, turnaroundDays: 6, durationHours: 1.5 },
      { id: "high-chair", name: "High chair", priceGBP: 32, turnaroundDays: 6, durationHours: 1 },
      { id: "sleepyhead", name: "Sleepyhead / Dock-a-Tot", priceGBP: 30, turnaroundDays: 6, durationHours: 1 },
      { id: "changing-bag", name: "Changing bag", priceGBP: 15, turnaroundDays: 6, durationHours: 0.5 },
      { id: "footmuff", name: "Footmuff or cover", priceGBP: 10, turnaroundDays: 6, durationHours: 0.5 },
    ],
  },
  {
    id: "bundles",
    label: "Travel System Bundles",
    description: "Complete travel system cleans at a bundle price. Includes disassembly, full clean and reassembly.",
    items: [
      {
        id: "bundle-full",
        name: "Full travel system: Frame, Bassinet, Toddler Seat, Car Seat + isofix base, Next to me crib & Changing Bag",
        priceGBP: 145,
        turnaroundDays: 6,
        durationHours: 5,
      },
      {
        id: "bundle-standard",
        name: "Standard travel system: Frame, Bassinet, Toddler Seat, Car Seat + isofix base & Changing Bag",
        priceGBP: 115,
        turnaroundDays: 6,
        durationHours: 4,
      },
      {
        id: "bundle-basic",
        name: "Basic travel system: Frame, Bassinet, Toddler Seat & Changing Bag",
        priceGBP: 85,
        turnaroundDays: 6,
        durationHours: 3,
      },
    ],
  },
  {
    id: "monthly",
    label: "Monthly Package",
    description: "Set up a recurring monthly clean. Pay £70/month. Charlotte will be in touch each month to arrange your drop-off.",
    items: [
      {
        id: "monthly-package",
        name: "Monthly clean: car seat + single buggy (Doona, travel pram or pram with frame, plus bassinet or toddler seat)",
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
    label: "Emergency & Add-ons",
    items: [
      { id: "emergency-car-seat", name: "Emergency car seat clean", priceGBP: 35, turnaroundDays: 1, durationHours: 1.5, note: "24hr turnaround. +£15 emergency surcharge applies. Contact Charlotte to arrange." },
      { id: "emergency-buggy", name: "Emergency buggy clean", priceGBP: 42, pricePrefix: "from", turnaroundDays: 1, durationHours: 2.5, note: "24hr turnaround. +£15 emergency surcharge applies. Contact Charlotte to arrange." },
      { id: "soiled-mould-charge", name: "Soiled / mould surcharge", priceGBP: 8, turnaroundDays: 6, durationHours: 0, note: "Per item, always confirmed before we proceed" },
    ],
  },
];

export const allServiceItems: ServiceItem[] = serviceCategories.flatMap((c) => c.items);

export function getServiceItemById(id: string): ServiceItem | undefined {
  return allServiceItems.find((item) => item.id === id);
}
