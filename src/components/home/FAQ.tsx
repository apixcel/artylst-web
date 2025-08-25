"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

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
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="w-full max-w-[1000px] mb-[60px]">
      <h2 className="text-2xl font-semibold tracking-tight mb-4">FAQ</h2>
      <div>
        {faqs.map((item, idx) => (
          <AccordionItem
            key={idx}
            open={open === idx}
            onToggle={() => setOpen(open === idx ? null : idx)}
            question={item.q}
            answer={item.a}
          />
        ))}
      </div>
    </section>
  );
}

function AccordionItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = slugify(question);

  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black"
        aria-expanded={open}
        aria-controls={id}
      >
        <ChevronRight
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-90" : "rotate-0"}`}
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
        <p className="leading-relaxed text-muted">{answer}</p>
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
