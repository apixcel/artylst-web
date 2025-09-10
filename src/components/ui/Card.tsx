const Card = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`rounded-2xl p-5 border border-white/10 bg-white/5 ${className}`}>
    {children}
  </div>
);
export default Card;
