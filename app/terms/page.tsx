import type { Metadata } from "next";
import { FadeUp } from "@/components/FadeUp";

export const metadata: Metadata = {
  title: "Terms & Conditions | Squeaky Clean Strollers",
  description:
    "The terms and conditions for Squeaky Clean Strollers baby equipment cleaning and sanitisation services.",
};

type Block =
  | { p: string }
  | { ul: string[] };

type Section = {
  n: string;
  title: string;
  blocks: Block[];
};

const sections: Section[] = [
  {
    n: "1",
    title: "Service Description",
    blocks: [
      { p: "We provide professional cleaning and sanitisation services for baby equipment, including but not limited to prams, pushchairs, car seats, highchairs, travel systems and baby carriers." },
      { p: "Our service is limited to cleaning and sanitisation only. We do not carry out repairs, servicing, maintenance or safety inspections." },
    ],
  },
  {
    n: "2",
    title: "Customer Responsibilities",
    blocks: [
      { p: "By booking our services, you confirm that:" },
      {
        ul: [
          "You own the item or have the authority to authorise its cleaning.",
          "The item is safe for us to handle.",
          "You have disclosed any known defects, manufacturer recalls, previous repairs, mould, pest infestations or contamination before the cleaning begins.",
          "You have informed us of any existing damage, faults or special cleaning requirements.",
        ],
      },
      { p: "Failure to disclose relevant information may affect the outcome of the clean, and we cannot accept responsibility for damage resulting from undisclosed issues." },
    ],
  },
  {
    n: "3",
    title: "Pre-Existing Damage",
    blocks: [
      { p: "All items are photographed and/or video recorded before cleaning to document their condition." },
      { p: "We are not responsible for damage caused by pre-existing wear and tear, weakened fabrics, deteriorated foam, rust, UV damage, brittle plastics, faulty stitching, previous repairs or hidden defects that become apparent during the cleaning process." },
    ],
  },
  {
    n: "4",
    title: "Car Seat Safety Disclaimer",
    blocks: [
      { p: "Cleaning a child car seat does not constitute a safety inspection or certification." },
      { p: "It remains the customer’s responsibility to ensure that the car seat is safe for continued use and complies with the manufacturer’s instructions and current safety guidance." },
    ],
  },
  {
    n: "5",
    title: "Manufacturer Guidelines",
    blocks: [
      { p: "Where available, we clean items in accordance with the manufacturer’s care instructions." },
      { p: "We reserve the right to refuse or discontinue a cleaning service if we believe cleaning may compromise the safety or structural integrity of the item." },
      { p: "If an item is heavily soiled, contaminated or affected by severe mould, we may decline to clean it." },
      { p: "Where appropriate, we may advise that certain components, such as harnesses, straps or fabric covers, should be replaced by genuine manufacturer parts before the item is used again. In these cases, we may clean the remaining parts of the item while leaving affected components untreated." },
      { p: "If we refuse to carry out the service before cleaning begins, any payment already made will be refunded in full." },
    ],
  },
  {
    n: "6",
    title: "Limitation of Liability",
    blocks: [
      { p: "Nothing in these Terms & Conditions excludes or limits liability where it would be unlawful to do so." },
      { p: "Subject to applicable law, our liability for loss or damage arising directly from our cleaning service will be limited to the lower of:" },
      {
        ul: [
          "the cost of the cleaning service; or",
          "the current fair market value of the item.",
        ],
      },
      { p: "We are not liable for indirect or consequential losses." },
    ],
  },
  {
    n: "7",
    title: "Stains and Odours",
    blocks: [
      { p: "While we use professional cleaning methods and products, we cannot guarantee complete removal of all stains, odours or discolouration." },
      { p: "Results will depend on factors including the age, type and cause of the staining or odour, as well as the condition of the item." },
    ],
  },
  {
    n: "8",
    title: "Collection and Storage",
    blocks: [
      { p: "Customers will be notified when their items are ready for collection." },
      { p: "Items not collected within 14 days of notification may be subject to reasonable storage charges." },
      { p: "If items remain uncollected for an extended period, we reserve the right to take further action in accordance with applicable law after making reasonable attempts to contact the customer." },
    ],
  },
  {
    n: "9",
    title: "Cancellation, Rescheduling and Deposits",
    blocks: [
      { p: "Deposits are non-refundable unless we cancel or refuse the cleaning service." },
      { p: "Appointments may be rescheduled without charge where at least 48 hours’ notice is provided." },
      { p: "Cancellations made with less than 48 hours’ notice may be charged up to the full cost of the booked service." },
      { p: "We understand that life with children can be unpredictable and will always try to accommodate genuine emergencies where possible." },
    ],
  },
  {
    n: "10",
    title: "Payment Terms",
    blocks: [
      { p: "Any outstanding balance must be paid in full on or before collection of the cleaned item." },
      { p: "Items may not be released until payment has been received." },
    ],
  },
  {
    n: "11",
    title: "Photography",
    blocks: [
      { p: "We may take photographs and/or videos of items before and after cleaning for quality control, insurance and record-keeping purposes." },
      { p: "Images will only be used for marketing or promotional purposes with the customer’s prior consent." },
    ],
  },
  {
    n: "12",
    title: "Right to Refuse Service",
    blocks: [
      { p: "We reserve the right to refuse or discontinue a cleaning service where:" },
      {
        ul: [
          "an item presents a health or safety risk;",
          "an item is heavily contaminated or infested;",
          "cleaning is likely to compromise the item’s safety or structural integrity; or",
          "the requested service cannot be carried out safely or to an acceptable professional standard.",
        ],
      },
      { p: "Where a service is refused before work begins, any payment made will be refunded." },
    ],
  },
  {
    n: "13",
    title: "Acceptance of Terms",
    blocks: [
      { p: "By booking our services, you confirm that you have read, understood and agree to these Terms & Conditions." },
    ],
  },
];

export default function TermsPage() {
  return (
    <div>
      {/* Charcoal header band */}
      <div className="px-6 py-16 lg:py-20" style={{ background: "var(--charcoal)" }}>
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <h1 className="font-display text-4xl tracking-tight sm:text-5xl" style={{ color: "#ffffff" }}>
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-base" style={{ color: "rgba(253,250,244,0.6)" }}>
              Please read these terms carefully. By booking our services you agree to them.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-16" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-3xl">
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.n}>
                <h2
                  className="font-display text-2xl"
                  style={{ fontWeight: 500, color: "var(--charcoal)" }}
                >
                  <span style={{ color: "var(--gold)" }}>{s.n}.</span> {s.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed" style={{ color: "var(--taupe)" }}>
                  {s.blocks.map((block, i) =>
                    "p" in block ? (
                      <p key={i}>{block.p}</p>
                    ) : (
                      <ul key={i} className="list-disc space-y-2 pl-6">
                        {block.ul.map((li, j) => (
                          <li key={j}>{li}</li>
                        ))}
                      </ul>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
