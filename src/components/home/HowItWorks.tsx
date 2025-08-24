import { Mail, Pen, Search, Upload } from "lucide-react";
import Link from "next/link";

const howItWorks = [
  {
    id: 1,
    icon: Search,
    title: "Find a celebrity",
    description: "Browse thousands of stars offering personalized videos.",
  },
  {
    id: 2,
    icon: Pen,
    title: "Tell them what to say",
    description:
      "During checkout, you’ll provide the details the celeb will need to make the perfect personalized video.",
  },
  {
    id: 3,
    icon: Mail,
    title: "Get your video",
    description:
      "Celebs have up to 7 days to complete your request. When it’s ready, we’ll send it directly to you.",
  },
  {
    id: 4,
    icon: Upload,
    title: "Share with loved ones",
    description:
      "Send the video to friends and family and don’t forget to capture their priceless reactions.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mb-[60px]">
      <div className="mb-[16px]">
        <h2 className="mb-[4px]">How Artylist works</h2>
        <p>
          Get a personalized video in just four steps.{" "}
          <Link href="/about" className="underline font-[500]">
            Learn more
          </Link>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {howItWorks.map((item) => (
          <div key={item.id} className="py-[22px] px-[26px] rounded-[16px] bg-level-1">
            <item.icon className="w-[24px] h-[24px]" />
            <h3 className="mt-[8px] mb-[2px]">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
