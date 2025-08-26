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
    <section className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-[60px]">
      {enrollWhyChooseUs.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center justify-center card p-[20px] rounded-[24px] text-center hover:bg-white/10"
        >
          <h3 className="font-bold mt-[8px] mb-[2px] font-bricolage-grotesque">
            {item.label}
          </h3>
          <p className="text-sm text-muted">{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default EnrollWhyChooseUs;
