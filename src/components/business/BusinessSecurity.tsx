const security = [
  {
    title: "Escrow payments",
    description: "Funds release after verified delivery.",
  },
  {
    title: "Privacy-first",
    description: "No direct contact exchange between parties.",
  },
  {
    title: "Compliance",
    description: "Data handling aligned with standard web best-practices.",
  },
];

const BusinessSecurity = () => {
  return (
    <section className="mb-[60px]">
      <h2 className="mb-[20px]">Security</h2>
      <div className="grid grid-cols-3 gap-[40px]">
        {security.map((item) => (
          <div key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessSecurity;
