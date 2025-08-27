import { ArrowRight, Mail, Pen, Search, Upload } from "lucide-react";
import Link from "next/link";

const homeHowItWorks = [
  {
    id: 1,
    icon: Search,
    title: "Find an artist",
    description: "Browse thousands of artists offering personalized playlists.",
  },
  {
    id: 2,
    icon: Pen,
    title: "Tell the vibe",
    description:
      "During checkout, you’ll provide the artist Occasion, preferred platform & personal note etc. to make the perfect personalized playlist.",
  },
  {
    id: 3,
    icon: Mail,
    title: "Get your playlist",
    description: "Artists give you Private link + 30s authentication video.",
  },
  {
    id: 4,
    icon: Upload,
    title: "Share & Refresh",
    description:
      "Send the video to friends and family and don’t forget to Re‑order or subscribe monthly.",
  },
];

const HomeHowItWorks = () => {
  return (
    <section className="mb-[60px]">
      <div className="mb-[16px]">
        <h2 className="mb-[4px]">How Artylist works</h2>
        <p>
          Get a personalized playlist in just four steps.{" "}
          <Link href="/about" className="underline font-[500]">
            Learn more
          </Link>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {homeHowItWorks.map((item, index) => (
          <div key={item.id} className="py-[22px] px-[26px] rounded-[16px] bg-brand-2/10">
            <div className="flex items-center gap-[8px] mb-[16px]">
              Step <ArrowRight className="w-[16px] h-[16px]" />
              <p className="text-[18px] font-[500] font-bricolage-grotesque border border-gray-55 w-[24px] h-[24px] flex-center rounded-full inline-block">
                {index + 1}
              </p>
            </div>
            <item.icon className="w-[24px] h-[24px]" />
            <h3 className="mt-[8px] mb-[2px]">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeHowItWorks;
