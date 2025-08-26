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
    description: "typical turnaround",
  },
];

const BusinessMetrics = () => {
  return (
    <section className="mb-[60px]">
      <div className="grid lg:grid-cols-4 gap-[16px]">
        {businessMetrics.map((metric) => (
          <div key={metric.title} className="flex flex-col items-center justify-center">
            <h3 className="text-[24px] font-bold text-white">{metric.title}</h3>
            <p className="text-[16px] text-muted">{metric.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessMetrics;
