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
      <div className="wrapper-inner">
        <h2 className="text-[24px] text-center font-bold mb-[20px] font-bricolage-grotesque">
          Earning estimate
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-[20px]">
          {estimateEarnings.map((earning) => (
            <div
              key={earning.id}
              className="py-[24px] px-[20px] rounded-[24px] text-center card"
            >
              <h3 className="font-bold mb-[12px] font-bricolage-grotesque">
                {earning.title}
              </h3>
              <p className="text-[16px] text-muted">{earning.earnings}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted text-center">
          *Illustrative only. Actual earnings depend on orders & tiers.
        </p>
      </div>
    </section>
  );
};

export default EnrollEarningEstimatior;
