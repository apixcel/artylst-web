import { Link } from "lucide-react";

const SectionHeader = ({
  title,
  subtitle,
  actionHref,
}: {
  title: string;
  subtitle?: string;
  actionHref?: string;
}) => (
  <div className="flex items-center justify-between mb-3">
    <div>
      <div className="font-heading">{title}</div>
      {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
    </div>
    {actionHref && (
      <Link href={actionHref} className="text-sm text-white/70 underline">
        View all
      </Link>
    )}
  </div>
);

export default SectionHeader;
