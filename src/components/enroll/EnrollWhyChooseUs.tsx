const enrollWhyChooseUs = [
  {
    label: "New revenue, low lift",
    description:
      "You already have references. Compile, personalize, deliver—no touring needed.",
  },
  {
    label: "Promote your releases",
    description:
      "Optionally include your new tracks in context—fans discover you organically.",
  },
  {
    label: "Privacy & payouts",
    description: "We shield personal info, hold funds until delivery, then auto-payout.",
  },
];

const EnrollWhyChooseUs = () => {
  return (
    <section className="wrapper-inner mb-[60px]">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {enrollWhyChooseUs.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center p-[20px] rounded-[24px] text-center bg-brand-4/10 border border-brand-4/20"
          >
            <h3 className="font-bold mt-[8px] mb-[8px] text-lg">{item.label}</h3>
            <p className="text-sm text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EnrollWhyChooseUs;
