const tools = [
  {
    id: 1,
    title: "Platforms",
    description: "Deliver private links for Spotify, Apple Music, YouTube Music.",
  },
  {
    id: 2,
    title: "Dashboard",
    description: "Accept/decline, deadlines, templates, quick re-order.",
  },
  {
    id: 3,
    title: "Payouts",
    description: "KYC once. Automated payouts post-delivery.",
  },
  {
    id: 4,
    title: "SLA",
    description: "Default 48–72h. Late flags help maintain quality.",
  },
  {
    id: 5,
    title: "Revisions",
    description: "One revision within 7 days of delivery.",
  },
  {
    id: 6,
    title: "Privacy",
    description: "No personal contact exchange; all comms via ARTYLST.",
  },
];

const EnrollTools = () => {
  return (
    <section className="mb-[60px]">
      <div className="wrapper">
        <h2 className="text-[24px] text-center font-bold mb-[20px] font-bricolage-grotesque">
          Tools
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-[20px]">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="p-[20px] rounded-[24px] text-center border border-white/10 bg-brand-2/10"
            >
              <h3 className="font-bold mb-[12px] font-bricolage-grotesque text-[16px] sm:text-[20px]">
                {tool.title}
              </h3>
              <p className="text-[14px] sm:text-[16px] text-muted">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnrollTools;
