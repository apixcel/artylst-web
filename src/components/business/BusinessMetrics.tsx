const businessMetrics = [
  {
    title: "$0",
    description: "setup fee",
  },
  {
    title: "30s",
    description: "auth video per delivery",
  },
  {
    title: "100%",
    description: "privacy shielded",
  },
  {
    title: "48–72h",
    description: "Typical turnaround",
  },
];

const BusinessMetrics = () => {
  return (
    <section className="wrapper-inner mb-[60px]">
      <div className="grid lg:grid-cols-4 gap-[16px]">
        {businessMetrics.map((metric) => (
          <div key={metric.title} className="flex flex-col items-center justify-center bg-brand-4/10 border border-brand-4/20 p-[20px] rounded-2xl">
            <h3 className="text-[24px] font-bold text-white mb-[10px] font-bricolage-grotesque">{metric.title}</h3>
            <p className="text-[16px] text-gray-200">{metric.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessMetrics;
