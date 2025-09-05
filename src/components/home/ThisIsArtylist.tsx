const thisIsArtylist = [
  {
    id: 1,
    title: "Playlist as unique as you",
    description:
      "Every playlist and authentication video is personalized for the person receiving it, creating a one-of-a-kind connection between Artists and their Audience.",
  },
  {
    id: 2,
    title: "Perfect for yourself, your business or your friends",
    description:
      "Every playlist and authentication video is personalized for the person receiving it, creating a one-of-a-kind connection between Artists and their Audience.",
  },
  {
    id: 3,
    title: "An Artist for every vibe",
    description:
      "With thousands of artists to choose from, there is quite literally the perfect match for every mood, vibe, or occasion and ready to build your next playlist.",
  },
];

const ThisIsArtylist = () => {
  return (
    <section className="mb-[60px]">
      <h2 className="mb-[20px] text-center">This is ARTYLST</h2>

      <div className="grid md:grid-cols-3 lg:gap-[24px] gap-[24px] md:gap-[16px] justify-center">
        {thisIsArtylist.map((item) => (
          <div key={item.id} className="border border-white/10 rounded-[24px] p-[24px]">
            <h3 className="mb-[4px]">{item.title}</h3>
            <p className="text-muted font-logam">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThisIsArtylist;
