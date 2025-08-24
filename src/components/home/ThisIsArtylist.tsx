const thisIsArtylist = [
  {
    id: 1,
    title: "Gifts as unique as the people you’re gifting to",
    description:
      "Every video is personalized for the person receiving it, creating one-of-a-kind connections between celebrities and the people they inspire.",
  },
  {
    id: 2,
    title: "Perfect for every occasion (or just because)",
    description:
      "From birthdays to holidays and friendly roasts, Cameo is here to help you bring magic into everyday moments both big and small.",
  },
  {
    id: 3,
    title: "Someone for every fan",
    description:
      "Everyone is welcome here. With over forty-thousand celebrities, there’s a star for every kind of fan on Cameo.",
  },
];

const ThisIsArtylist = () => {
  return (
    <section className="mb-[60px]">
      <h2 className="mb-[20px]">This is Artylist</h2>

      <div className="grid md:grid-cols-3 lg:gap-[24px] gap-[24px] md:gap-[16px]">
        {thisIsArtylist.map((item) => (
          <div key={item.id}>
            <h3 className="mb-[4px]">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThisIsArtylist;
