function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`animate-pulse rounded bg-white/10 ${className || ""}`} {...props} />
  );
}

export default Skeleton;
