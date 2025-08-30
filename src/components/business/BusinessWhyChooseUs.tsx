"use client";

const features = [
  {
    feature: "Custom curation",
    artylst: "By real artists, on-brief",
    generic: "Preset mood lists",
    other: "AI-generated playlists",
  },
  {
    feature: "Authentication",
    artylst: "30s artist video",
    generic: "None",
    other: "Basic profile check",
  },
  {
    feature: "Privacy",
    artylst: "No personal info shared",
    generic: "Often email exchanges",
    other: "Data shared with partners",
  },
  {
    feature: "Refresh",
    artylst: "One-click monthly refresh",
    generic: "Manual updates",
    other: "Limited seasonal refresh",
  },
];

const BusinessWhyChooseUs = () => {
  return (
    <section className="mb-[60px]">
      <div className="wrapper">
        <h2 className="mb-[20px] text-center font-bricolage-grotesque text-xl font-semibold">
          Why ARTYLST vs others
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-white/80">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="py-3 px-4">Feature</th>
                <th className="py-3 px-4">ARTYLST</th>
                <th className="py-3 px-4">Generic service</th>
                <th className="py-3 px-4">Other service</th>
              </tr>
            </thead>
            <tbody>
              {features.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-white/10 last:border-0 hover:bg-white/5 transition"
                >
                  <td className="py-3 px-4">{item.feature}</td>
                  <td className="py-3 px-4">{item.artylst}</td>
                  <td className="py-3 px-4">{item.generic}</td>
                  <td className="py-3 px-4">{item.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BusinessWhyChooseUs;
