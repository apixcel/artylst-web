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
    <section className="mb-[60px]">
      <div className="grid grid-cols-3 gap-[16px]">
        {useCase.map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center">
            <h3 className="text-[24px] font-bold text-white mb-[16px]">{item.title}</h3>
            <p className="text-[16px] text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessUseCase;
