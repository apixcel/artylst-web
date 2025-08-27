const useCase = [
  {
    title: "Yoga & Wellness",
    description: "Ambient flows, breath-paced, instructor-friendly.",
  },
  {
    title: "Hospitality",
    description: "Daypart playlists from brunch to late-night lounge.",
  },
  {
    title: "Retail & Clinics",
    description: "On-brand sound to lift dwell time & comfort.",
  },
];

const BusinessUseCase = () => {
  return (
    <section className="mb-[60px] bg-white/10 p-10">
      <div className="lg:wrapper">
        <div className="grid md:grid-cols-3 md:gap-[16px] gap-[24px]">
          {useCase.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center relative text-center"
            >
              <h3 className="text-[24px] font-bricolage-grotesque font-bold text-business-use-case-text mb-[16px]">
                {item.title}
              </h3>
              <p className="text-[16px] text-business-use-case-text">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessUseCase;
