import { Lock, ShieldCheck, Video } from "lucide-react";

const privacyStrip = [
  {
    label: "Secure Escrow",
    description: "We guard your goods ‘til you’re groovin",
    icon: Lock,
  },
  {
    label: "30s auth video",
    description: "Legit aura every time, no cap",
    icon: Video,
  },
  {
    label: "Privacy first",
    description: "We got you fam.",
    icon: ShieldCheck,
  },
];

const PrivacyStrip = () => {
  return (
    <section className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-[60px]">
      {privacyStrip.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center card py-[20px] px-[16px] rounded-[24px] text-center hover:bg-white/10"
        >
          <item.icon className="w-8 h-8" />
          <h3 className="font-bold mt-[8px] mb-[2px]">{item.label}</h3>
          <p className="text-sm text-muted">{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default PrivacyStrip;
