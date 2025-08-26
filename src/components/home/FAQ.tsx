"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

// Your same FAQ content
const faqs = [
  {
    q: "Which platforms do you support?",
    a: "Spotify, Apple Music, YouTube Music — the artist will deliver a private link.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 2–5 business days depending on scope. You'll see an ETA at checkout and get updates by email.",
  },
  {
    q: "Do you share personal contact info?",
    a: "No. We keep communication inside the platform for safety and privacy.",
  },
  {
    q: "What if I need a revision?",
    a: "You can request revisions within 7 days of delivery. Minor fixes are usually turned around in 24–48 hours.",
  },
  {
    q: "Can I cancel an order?",
    a: "Yes, you can cancel before the artist has started working. Once work has begun, cancellations may be subject to partial refunds depending on progress.",
  },
  {
    q: "How do payments work?",
    a: "All payments are handled securely through our platform. Funds are held in escrow and only released to the artist once the order is completed and approved.",
  },
  {
    q: "Do artists retain rights to the music?",
    a: "Yes. Unless you’ve purchased a business or exclusive license, artists retain copyright ownership. You’re buying usage rights as outlined in the tier you select.",
  },
  {
    q: "Can I request a specific genre or vibe?",
    a: "Definitely. At checkout, you can specify mood, tempo, and inspirations to help the artist tailor the playlist or track to your preferences.",
  },
  {
    q: "What happens if the artist misses the deadline?",
    a: "If an artist fails to deliver on time, you’ll receive an updated ETA. If they cannot complete the order, you’ll be fully refunded.",
  },
  {
    q: "Is there support if I have an issue?",
    a: "Yes. Our support team is available by email or chat for order issues, disputes, or general questions.",
  },
];

export default function FAQTwoColumn() {
  const [open, setOpen] = useState<number | null>(null);

  // split into two balanced columns
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section className="w-full max-w-5xl mx-auto mb-[60px]">
      <h2 className="text-2xl font-semibold tracking-tight mb-4">FAQs</h2>

      {/* responsive 1 → 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
        <div className="flex flex-col gap-2">
          {left.map((item, idx) => (
            <AccordionItem
              key={idx}
              open={open === idx}
              onToggle={() => setOpen(open === idx ? null : idx)}
              question={item.q}
              answer={item.a}
              index={idx}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {right.map((item, rIdx) => {
            // ensure unique indices across both columns
            const idx = rIdx + left.length;
            return (
              <AccordionItem
                key={idx}
                open={open === idx}
                onToggle={() => setOpen(open === idx ? null : idx)}
                question={item.q}
                answer={item.a}
                index={idx}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({
  question,
  answer,
  open,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  const id = slugify(`${index}-${question}`);

  return (
    <div className="bg-white/10 rounded-lg">
      <button
        onClick={onToggle}
        className="w-full text-base flex gap-3 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-expanded={open}
        aria-controls={id}
      >
        <ChevronRight
          className={`h-4 w-4 shrink-0 mt-[4px] transition-transform ${open ? "rotate-90" : "rotate-0"}`}
          aria-hidden="true"
        />
        <span className="font-medium text-[16px]">{question}</span>
      </button>

      {/* Simple, reliable toggle */}
      <div
        id={id}
        role="region"
        aria-hidden={!open}
        className={`${open ? "block" : "hidden"} px-11 pb-4 text-sm`}
      >
        <p className="leading-relaxed text-muted text-base">{answer}</p>
      </div>
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
