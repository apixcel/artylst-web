const useCase = [
  {
    title: "Yoga & Wellness",
    description: "Downtempo, Ambient Flows, Instructor-Friendly",
  },
  {
    title: "Hospitality",
    description: "Music playlist for everything from Brunch to Late-Night Lounges",
  },
  {
    title: "Retail & Clinics",
    description: "On-Brand sound from waiting rooms to retail storefronts",
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
              <h3 className="text-[24px] font-bold text-business-use-case-text mb-[16px]">
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
