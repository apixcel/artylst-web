const estimateEarnings = [
  {
    id: 1,
    title: "Tier price",
    earnings: "$50",
  },
  {
    id: 2,
    title: "Orders / month",
    earnings: "12",
  },
  {
    id: 3,
    title: "ARTYLST fee",
    earnings: "20%",
  },
  {
    id: 4,
    title: "Your take-home*",
    earnings: "$480",
  },
];

const EnrollEarningEstimatior = () => {
  return (
    <section className="mb-[60px]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-[20px]">
        {estimateEarnings.map((earning) => (
          <div key={earning.id} className="p-[20px] rounded-[24px] text-center">
            <h3 className="font-bold mt-[8px] mb-[2px] font-bricolage-grotesque">
              {earning.title}
            </h3>
            <p className="text-sm text-muted">{earning.earnings}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted">
        *Illustrative only. Actual earnings depend on orders & tiers.
      </p>
    </section>
  );
};

export default EnrollEarningEstimatior;
