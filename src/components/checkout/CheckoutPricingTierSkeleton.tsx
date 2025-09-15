const CheckoutPricingTierSkeleton = () => {
  return (
    <div
      className={
        "card bg-gradient-to-b from-brand-1/10 to-brand-4/8 text-center p-5 flex flex-col cursor-not-allowed xl:col-span-1 sm:col-span-2 col-span-1 sm:col-start-auto"
      }
    >
      {/* Title + price */}
      <div className="flex flex-col gap-5 mb-6 items-center">
        <div className="h-4 w-20 rounded bg-white/25 animate-pulse" />
        <div className="h-7 w-24 rounded bg-white/30 animate-pulse" />
      </div>

      {/* Bullets */}
      <ul className="space-y-2 mb-5">
        {Array.from({ length: 3 }).map((__, j) => (
          <li key={j} className="flex gap-2 text-left items-center">
            <span
              className="w-4 h-4 rounded bg-white/30 shrink-0 animate-pulse"
              aria-hidden
            />
            <span className="h-3 w-[85%] rounded bg-white/20 animate-pulse" />
          </li>
        ))}
      </ul>

      {/* CTA placeholder */}
      <div className="h-9 w-full rounded bg-white/20 animate-pulse" />
    </div>
  );
};

export default CheckoutPricingTierSkeleton;
