import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Settings,
  Sparkles,
  Video,
  Wallet,
  Zap,
} from "lucide-react";

const ChecklistItem = ({
  done,
  label,
  href,
}: {
  done?: boolean;
  label: string;
  href: string;
}) => (
  <li className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
    <div className={`mt-0.5 rounded-full ${done ? "text-emerald-400" : "text-white/50"}`}>
      <CheckCircle2 className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <div className="font-medium">{label}</div>
      <div className="text-xs text-muted">{done ? "Completed" : "Incomplete"}</div>
    </div>
    <Link href={href} className="inline-flex items-center gap-1 btn-tertiary">
      Manage <ArrowRight className="h-4 w-4" />
    </Link>
  </li>
);

const MiniStat = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-2xl p-5 border border-white/10 bg-brand-2/10">
    <div className="flex xl:flex-row flex-col items-center gap-2 text-muted text-base">
      <Icon className="h-5 w-5" /> {label}
    </div>
    <div className="text-2xl font-heading mt-1 text-center xl:text-left">{value}</div>
  </div>
);

const Bar = ({ pct, title }: { pct: number; title: string }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{title}</span>
      <span>{pct}%</span>
    </div>
    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full rounded-full bg-muted" style={{ width: pct + "%" }} />
    </div>
  </div>
);

const OrderRow = ({
  id,
  name,
  dueInDays,
}: {
  id: number;
  name: string;
  dueInDays: number;
}) => (
  <div className="p-4 rounded-xl border border-white/10 bg-white/10 flex items-center gap-3">
    <div className="h-10 w-10 rounded-xl bg-[url('https://i.pravatar.cc/100?img=11')] bg-cover" />
    <div className="flex-1">
      <div>
        #{id} • {name}
      </div>
      <div className="text-muted text-xs">Due in {dueInDays} days</div>
    </div>
    <Link className="btn-tertiary" href={`/dashboard/artist/orders/${id}`}>
      View
    </Link>
  </div>
);

const Tip = ({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) => (
  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
    <div className="flex items-center gap-2 font-medium">
      <Icon className="h-4 w-4" /> {title}
    </div>
    <p className="text-sm text-white/70 mt-1">{body}</p>
  </div>
);

const ArtistCard = ({
  name,
  handle,
  avatar,
  genres,
  priceFrom,
  rating,
  slug,
}: {
  name: string;
  handle: string;
  avatar: string;
  genres: string[];
  priceFrom: number;
  rating: number;
  slug: string;
}) => (
  <div className="rounded-2xl p-4 border border-white/10 bg-white/5 flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div
        className="h-12 w-12 rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${avatar})` }}
      />
      <div>
        <div className="font-medium leading-tight text-base">{name}</div>
        <div className="text-sm text-muted">@{handle}</div>
      </div>
    </div>
    <div className="flex flex-wrap gap-1">
      {genres.map((g) => (
        <span
          key={g}
          className="text-xs px-2 py-1 rounded-md bg-white/10 border border-white/10"
        >
          {g}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-between text-sm">
      <div className="text-muted">From ${priceFrom}</div>
      <div className="text-muted">★ {rating.toFixed(1)}</div>
    </div>
    <Link
      href={`/artists/${slug}`}
      className="inline-flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
    >
      View profile <ArrowRight className="h-4 w-4" />
    </Link>
  </div>
);

const DashboardArtistPage = () => {
  // --- stubbed data ---
  const metrics = {
    openOrders: 3,
    avgDelivery: "2.9d",
    onTime: "94%",
    earnings30d: "$2,340",
  };

  const checklist = [
    { label: "Complete profile", href: "/dashboard/artist/profile", done: true },
    { label: "Verify identity (KYC)", href: "/dashboard/artist/kyc", done: false },
    { label: "Set pricing tiers", href: "/dashboard/artist/tiers", done: false },
    { label: "Connect payouts", href: "/dashboard/artist/earnings", done: true },
    {
      label: "Connect streaming platform",
      href: "/dashboard/artist/streaming",
      done: false,
    },
    {
      label: "Set your availability",
      href: "/dashboard/artist/availability",
      done: true,
    },
  ];

  const queue = [
    { id: 2341, name: "Arif", dueInDays: 3 },
    { id: 2342, name: "Nadia", dueInDays: 5 },
  ];

  const similar = [
    {
      name: "Mira",
      handle: "miraverse",
      avatar: "https://i.pravatar.cc/100?img=13",
      genres: ["Indie", "Electro"],
      priceFrom: 34,
      rating: 4.8,
      slug: "mira",
    },
    {
      name: "Oni",
      handle: "oniwav",
      avatar: "https://i.pravatar.cc/100?img=16",
      genres: ["Dream Pop"],
      priceFrom: 30,
      rating: 4.6,
      slug: "oni",
    },
    {
      name: "Shafin",
      handle: "shafinmix",
      avatar: "https://i.pravatar.cc/100?img=21",
      genres: ["Alt", "Indie"],
      priceFrom: 27,
      rating: 4.7,
      slug: "shafin",
    },
    {
      name: "Raisa",
      handle: "raisa.fm",
      avatar: "https://i.pravatar.cc/100?img=22",
      genres: ["Indie", "R&B"],
      priceFrom: 38,
      rating: 4.9,
      slug: "raisa",
    },
  ];

  return (
    <section className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-heading">Welcome back, Sloane</h1>
        <Link
          href="/dashboard/artist/deliver"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-2/20 hover:bg-brand-2/15 border border-white/10"
        >
          <Zap className="h-4 w-4" /> Quick deliver
        </Link>
      </div>

      {/* KPI row */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat
          label="Open orders"
          value={String(metrics.openOrders)}
          icon={Headphones}
        />
        <MiniStat label="Avg. delivery" value={metrics.avgDelivery} icon={Clock} />
        <MiniStat label="On‑time" value={metrics.onTime} icon={ShieldCheck} />
        <MiniStat label="Earnings (30d)" value={metrics.earnings30d} icon={DollarSign} />
      </div>

      {/* Setup checklist + Earnings snapshot */}
      <div className="grid xl:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-xl">
          <h3 className="flex items-center gap-2">
            <Settings className="h-5 w-5" /> Get set up
          </h3>
          <ul className="mt-4 space-y-3">
            {checklist.map((c) => (
              <ChecklistItem key={c.label} {...c} />
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Finish these to start accepting more orders smoothly.
          </p>
        </div>

        <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-2/10 to-brand-1/10 backdrop-blur-xl">
          <h3 className="flex items-center gap-2">
            <Wallet className="h-5 w-5" /> Earnings snapshot
          </h3>
          <div className="mt-4 space-y-3">
            <Bar pct={72} title="Goal progress (this month)" />
            <Bar pct={94} title="On‑time delivery rate" />
            <Bar pct={88} title="Response rate" />
          </div>
          <div className="mt-4 flex gap-2">
            <Link href="/dashboard/artist/earnings" className="btn-tertiary">
              View earnings
            </Link>
            <Link href="/dashboard/artist/availability" className="btn-tertiary">
              Update availability
            </Link>
          </div>
        </div>
      </div>

      {/* Queue + Messages */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6 border border-white/10 bg-brand-1/10 backdrop-blur-xl">
          <h3>Your queue</h3>
          <div className="mt-3 space-y-3 text-sm">
            {queue.map((o) => (
              <OrderRow key={o.id} {...o} />
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/dashboard/artist/orders"
              className="text-sm inline-flex items-center gap-1 text-white/80 hover:text-white"
            >
              All orders <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-2xl p-6 border border-white/10 bg-brand-1/10 backdrop-blur-xl">
          <h3 className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" /> Inbox
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              Nadia • “Confirming Spotify link works—thank you!”
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              Sam • “Can we make it more upbeat?”
            </div>
          </div>
          <div className="mt-4 text-right">
            <Link
              href="/dashboard/artist/messages"
              className="text-sm inline-flex items-center gap-1 text-white/80 hover:text-white"
            >
              Open messages <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Guidelines & tips (from docs) */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-r from-brand-1/10 to-brand-4/8 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" /> Best practices
          </h3>
          <Link
            href="/dashboard/artist/settings"
            className="text-sm inline-flex items-center gap-1 text-white/80 hover:text-white"
          >
            Settings <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <Tip
            icon={Video}
            title="Add the 30s video"
            body="Always attach a short video authenticating the playlist for the fan."
          />
          <Tip
            icon={ShieldCheck}
            title="Privacy first"
            body="LYSTN acts as intermediary—don’t share personal contact info."
          />
          <Tip
            icon={DollarSign}
            title="20% service fee"
            body="Payouts release after you submit the playlist link and video."
          />
        </div>
      </div>

      {/* Similar to you (based on genres / orders) */}
      <div className="rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-brand-4/8 to-brand-1/10 backdrop-blur-xl">
        <h3 className="mb-3 flex items-center gap-2">
          <Headphones className="h-5 w-5" /> Similar to you
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {similar.map((a) => (
            <ArtistCard key={a.slug} {...a} />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl p-6 border border-white/10 bg-brand-1/10 backdrop-blur-xl">
        <h3 className="mb-3">Quick actions</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/tiers"
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4" /> Adjust tiers
          </Link>
          <Link
            href="/availability"
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
          >
            <Clock className="h-4 w-4" /> Toggle availability
          </Link>
          <Link
            href="/streaming"
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
          >
            <Headphones className="h-4 w-4" /> Connect streaming
          </Link>
          <Link
            href="/kyc"
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
          >
            <ShieldCheck className="h-4 w-4" /> Verify identity
          </Link>
          <Link
            href="/deliver"
            className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 inline-flex items-center gap-2"
          >
            <Zap className="h-4 w-4" /> Deliver an order
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardArtistPage;
