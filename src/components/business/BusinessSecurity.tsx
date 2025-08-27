import { DollarSign, Lock, Shield } from "lucide-react";

const security = [
  {
    icon: DollarSign,
    title: "Escrow payments",
    description: "Funds release after verified delivery.",
  },
  {
    icon: Lock,
    title: "Privacy-first",
    description: "No direct contact exchange between parties.",
  },
  {
    icon: Shield,
    title: "Compliance",
    description: "Data handling aligned with standard web best-practices.",
  },
];

const BusinessSecurity = () => {
  return (
    <section className="mb-[60px]">
      <div className="wrapper-inner">
        <h2 className="mb-[20px] text-center font-bricolage-grotesque text-xl font-semibold">
          Security
        </h2>
        <div className="grid grid-cols-3 gap-[40px]">
          {security.map((item) => (
            <div
              key={item.title}
              className="text-center border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-center gap-2 mb-[20px]">
                <item.icon className="w-6 h-6" />
                <h3>{item.title}</h3>
              </div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessSecurity;
