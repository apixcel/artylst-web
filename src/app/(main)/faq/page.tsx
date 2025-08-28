"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqSections = [
  {
    title: "Ordering & Delivery",
    description:
      "Everything you need to know about placing orders, delivery times, revisions, and cancellations.",
    items: [
      {
        q: "Which platforms do you support?",
        a: "Spotify, Apple Music, YouTube Music — the artist will deliver a private link.",
      },
      {
        q: "How long does delivery take?",
        a: "Most orders are delivered within 2–5 business days depending on scope.",
      },
      {
        q: "Can I request a specific genre or vibe?",
        a: "Definitely. At checkout, you can specify mood, tempo, and inspirations.",
      },
      {
        q: "What if I need a revision?",
        a: "You can request revisions within 7 days of delivery. Minor fixes are usually done in 24–48 hours.",
      },
      {
        q: "Can I cancel an order?",
        a: "Yes, you can cancel before the artist has started working. After that, partial refunds may apply.",
      },
      {
        q: "What happens if the artist misses the deadline?",
        a: "If an artist fails to deliver on time, you’ll be refunded or get an updated ETA.",
      },
      {
        q: "Can I track the progress of my order?",
        a: "Yes, you can monitor progress through your dashboard with status updates.",
      },
      {
        q: "Do you offer gift options?",
        a: "Yes, you can send an order as a gift with a custom message included.",
      },
      {
        q: "Do you work with international clients?",
        a: "Yes, artists and clients from all over the world are welcome.",
      },
      {
        q: "Can I collaborate with multiple artists?",
        a: "Yes, you can order from multiple artists and even request collaborations.",
      },
    ],
  },
  {
    title: "Payments & Licensing",
    description:
      "Learn about payment security, refund policies, licensing rights, and commercial usage.",
    items: [
      {
        q: "How do payments work?",
        a: "All payments are handled securely. Funds are held in escrow and released upon completion.",
      },
      {
        q: "Is my payment information safe?",
        a: "Absolutely. We use industry-standard encryption and secure gateways.",
      },
      {
        q: "Are refunds guaranteed?",
        a: "Refunds are available if your order isn’t delivered or doesn’t meet the scope.",
      },
      {
        q: "Do artists retain rights to the music?",
        a: "Yes. Unless you’ve purchased a business or exclusive license, artists keep ownership.",
      },
      {
        q: "Can I use the music commercially?",
        a: "Commercial use requires purchasing a business or exclusive license.",
      },
      {
        q: "Do you offer bulk discounts?",
        a: "For large orders or business packages, special pricing is available.",
      },
      {
        q: "What file formats do you deliver?",
        a: "Most artists deliver in MP3 or WAV. You can specify at checkout.",
      },
      {
        q: "Do you provide invoices for businesses?",
        a: "Yes, invoices are automatically generated and downloadable from your account.",
      },
      {
        q: "Are tips allowed?",
        a: "Yes, you can tip artists after delivery.",
      },
      {
        q: "Do you offer subscriptions?",
        a: "Yes, we offer monthly subscription packages with discounted pricing.",
      },
    ],
  },
  {
    title: "Support & Account",
    description:
      "Find help with your account, communication, dispute resolution, and customer support.",
    items: [
      {
        q: "Do you share personal contact info?",
        a: "No. We keep communication inside the platform for safety and privacy.",
      },
      {
        q: "Is there support if I have an issue?",
        a: "Yes. Our support team is available by email or chat for disputes or questions.",
      },
      {
        q: "What if I’m not happy with the result?",
        a: "You can request revisions. If unsatisfied, our dispute team will step in.",
      },
      {
        q: "Can artists refuse an order?",
        a: "Yes, if the request is against guidelines or outside expertise.",
      },
      {
        q: "How do I know the artist is authentic?",
        a: "All artists are verified before joining. You’ll see a verified badge.",
      },
      {
        q: "What if I miss an update?",
        a: "Updates are saved in your dashboard and sent via email notifications.",
      },
      {
        q: "Do you store my files forever?",
        a: "Files remain in your account for 12 months. Please download for safe storage.",
      },
      {
        q: "Can I message the artist before ordering?",
        a: "Yes, you can send a short inquiry before placing your order.",
      },
      {
        q: "Can I hire the same artist again?",
        a: "Of course! You can reorder directly from the artist’s profile.",
      },
      {
        q: "Is there a community or forum?",
        a: "Yes, we have a community hub where artists and clients can connect.",
      },
    ],
  },
];

export default function FAQThreeSection() {
  // FIX: state should be string | null instead of number | null
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="w-full max-w-5xl mx-auto mb-[60px]">
      <h2 className="text-2xl font-semibold tracking-tight mb-2">
        Frequently Asked Questions
      </h2>
      <p className="text-muted mb-8">
        We’ve grouped our FAQs into three main categories for your convenience. Browse
        through each section to quickly find what you’re looking for.
      </p>

      {faqSections.map((section, sIdx) => {
        const mid = Math.ceil(section.items.length / 2);
        const left = section.items.slice(0, mid);
        const right = section.items.slice(mid);

        return (
          <div key={sIdx} className="mb-[50px]">
            <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
            <p className="text-muted mb-4">{section.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
              <div className="flex flex-col gap-2">
                {left.map((item, idx) => {
                  const index = `${sIdx}-${idx}`;
                  return (
                    <AccordionItem
                      key={index}
                      open={open === index}
                      onToggle={() => setOpen(open === index ? null : index)}
                      question={item.q}
                      answer={item.a}
                      index={index}
                    />
                  );
                })}
              </div>

              <div className="flex flex-col gap-2">
                {right.map((item, rIdx) => {
                  const index = `${sIdx}-${rIdx + left.length}`;
                  return (
                    <AccordionItem
                      key={index}
                      open={open === index}
                      onToggle={() => setOpen(open === index ? null : index)}
                      question={item.q}
                      answer={item.a}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

type AccordionItemProps = {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: string;
};

function AccordionItem({ question, answer, open, onToggle, index }: AccordionItemProps) {
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
          className={`h-4 w-4 shrink-0 mt-[4px] transition-transform duration-300 ${
            open ? "rotate-90" : "rotate-0"
          }`}
          aria-hidden="true"
        />
        <span className="font-medium text-[16px]">{question}</span>
      </button>

      <div
        id={id}
        role="region"
        aria-hidden={!open}
        className={`
          grid overflow-hidden px-11
          transition-[grid-template-rows] duration-300 ease-out
          ${open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr] pb-0"}
        `}
      >
        <div className="min-h-0">
          <p
            className={`
              leading-relaxed text-muted text-base
              transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}
            `}
          >
            {answer}
          </p>
        </div>
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
