import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  FileText,
  Link as LinkIcon,
  MessageSquare,
  Play,
  ShieldCheck,
  XCircle,
} from "lucide-react";

// ✅ Server Component (App Router)
// Route: app/orders/[slug]/page.tsx
export default async function OrderDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Demo order (replace with real fetch)
  const ORDER = {
    id: slug,
    status: "in_progress" as "in_progress" | "delivered" | "revisions" | "disputed",
    eta: "Aug 31",
    placedAt: "Aug 24, 2025",
    artist: {
      name: "Sloane Rivers",
      handle: "sloane",
      avatar: "https://i.pravatar.cc/100?img=44",
    },
    tier: "Standard",
    price: 89,
    platform: "Spotify",
    revisions: { used: 0, limit: 2 },
    brief: {
      occasion: "Workout",
      vibe: "High energy",
      donts: "No explicit",
      notes:
        "Faster tempo ~120–130 BPM, female vocals preferred. Add a few classic throwbacks.",
    },
    // If delivered, include deliverables
    deliverables: null as null | {
      playlistUrl: string;
      videoUrl: string; // 30s authentication video
      deliveredAt: string;
    },
    audit: [
      { ts: "Aug 24, 11:03", text: "Payment confirmed" },
      { ts: "Aug 24, 11:05", text: "Artist accepted request" },
      { ts: "Aug 26, 14:22", text: "Artist started working" },
    ],
    transaction: {
      method: "Visa •••• 4242",
      invoice: "INV-2341",
      feePct: 20,
    },
  };

  const statusMap: Record<typeof ORDER.status, { label: string; chip: string }> = {
    in_progress: {
      label: "In progress",
      chip: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    delivered: {
      label: "Delivered",
      chip: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    revisions: {
      label: "Revisions",
      chip: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    disputed: {
      label: "Disputed",
      chip: "bg-red-500/10 text-red-500 border-red-500/20",
    },
  };

  const Chip = ({
    children,
    className = "",
  }: React.PropsWithChildren<{ className?: string }>) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border border-white/10 bg-white/5 ${className}`}
    >
      {children}
    </span>
  );

  return (
    <section className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading">Order #{ORDER.id}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Chip className={statusMap[ORDER.status].chip}>
              {statusMap[ORDER.status].label}
            </Chip>
            <span className="inline-flex items-center gap-1">
              <CalendarClock className="h-4 w-4" /> Placed {ORDER.placedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" /> ETA: {ORDER.eta}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/messages?order=${ORDER.id}`}
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm inline-flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" /> Message artist
          </Link>
          <Link
            href="#"
            className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm"
          >
            Request revision
          </Link>
          <Link
            href="#"
            className="px-3 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-sm"
          >
            Cancel & refund
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Main */}
        <div className="md:col-span-2 space-y-4">
          {/* Progress / timeline */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="text-sm text-white/60">Progress</div>
            <div className="mt-3">
              {/* Progress bar */}
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-brand-500"
                  style={{
                    width:
                      ORDER.status === "in_progress"
                        ? "50%"
                        : ORDER.status === "delivered"
                          ? "100%"
                          : ORDER.status === "revisions"
                            ? "75%"
                            : "25%",
                  }}
                />
              </div>
              {/* Timeline list */}
              <div className="mt-4 space-y-3 text-sm">
                {ORDER.audit.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${i === ORDER.audit.length - 1 ? "bg-yellow-300" : "bg-emerald-400"}`}
                    ></span>
                    <span>{a.text}</span>
                    <span className="text-white/50">• {a.ts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buyer brief */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="text-sm text-white/60">Buyer brief</div>
            <div className="mt-2 text-sm">
              Occasion: <span className="text-white">{ORDER.brief.occasion}</span> • Vibe:{" "}
              <span className="text-white">{ORDER.brief.vibe}</span> • Don’t:{" "}
              <span className="text-white">{ORDER.brief.donts}</span>
            </div>
            <div className="mt-3 rounded-xl p-4 border border-white/10 bg-white/5">
              <div className="text-white/70 text-sm">Notes</div>
              <div className="mt-1 text-sm">{ORDER.brief.notes}</div>
            </div>
            {/* Attachments (optional) */}
            <div className="mt-3 text-sm text-white/70">
              Attachments: <span className="text-white/50">None</span>
            </div>
          </div>

          {/* Delivery */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="font-heading flex items-center gap-2">
              Delivery{" "}
              {ORDER.deliverables ? (
                <CheckCircle2 className="h-4 w-4 text-green-400" />
              ) : (
                <Clock className="h-4 w-4 text-yellow-300" />
              )}
            </div>
            {!ORDER.deliverables ? (
              <div className="text-sm text-white/60 mt-1">
                Waiting for artist… You’ll be notified once the playlist & 30s video are
                submitted.
              </div>
            ) : (
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                  <div className="text-sm text-white/70 flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> Private playlist
                  </div>
                  <Link
                    href={ORDER.deliverables.playlistUrl}
                    className="mt-2 inline-flex items-center gap-2 underline"
                  >
                    Open playlist <FileText className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                  <div className="text-sm text-white/70 flex items-center gap-2">
                    <Play className="h-4 w-4" /> 30s authentication video
                  </div>
                  <video
                    controls
                    className="mt-2 w-full h-40 rounded-lg object-cover bg-black/30"
                  >
                    <source src={ORDER.deliverables.videoUrl} />
                  </video>
                </div>
              </div>
            )}
          </div>

          {/* Audit log */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="text-sm text-white/60">Audit log</div>
            <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
              {ORDER.audit.map((a, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 border border-white/10 bg-white/5 flex items-center justify-between"
                >
                  <div>{a.text}</div>
                  <div className="text-white/50">{a.ts}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          {/* Artist card */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${ORDER.artist.avatar})` }}
              />
              <div>
                <div className="font-heading">{ORDER.artist.name}</div>
                <div className="text-xs text-white/60">@{ORDER.artist.handle}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href={`/artists/${ORDER.artist.handle}`}
                className="px-3 py-2 rounded-lg bg-white/10 text-xs"
              >
                View profile
              </Link>
              <Link
                href={`/messages?order=${ORDER.id}`}
                className="px-3 py-2 rounded-lg bg-white/10 text-xs"
              >
                Message
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="font-heading mb-2">Order summary</div>
            <div className="text-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Tier</span>
                <span>{ORDER.tier}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Platform</span>
                <span>{ORDER.platform}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Revisions</span>
                <span>
                  {ORDER.revisions.used}/{ORDER.revisions.limit}
                </span>
              </div>
              <div className="h-px bg-white/10 my-1" />
              <div className="flex items-center justify-between">
                <span className="text-white/60">Subtotal</span>
                <span>${ORDER.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">
                  LYSTN Fee ({ORDER.transaction.feePct}%)
                </span>
                <span>
                  ${((ORDER.price * ORDER.transaction.feePct) / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>${ORDER.price.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-white/60">
              Paid with {ORDER.transaction.method} • Invoice {ORDER.transaction.invoice}
            </div>
            <div className="mt-3 flex gap-2">
              <Link
                href={`/receipts`}
                className="px-3 py-2 rounded-lg bg-white/10 text-xs inline-flex items-center gap-2"
              >
                <FileText className="h-3.5 w-3.5" /> View receipt
              </Link>
              <Link href="#" className="px-3 py-2 rounded-lg bg-white/10 text-xs">
                Download PDF
              </Link>
            </div>
          </div>

          {/* Safety & policy */}
          <div className="rounded-2xl p-6 border border-white/10 bg-white/5">
            <div className="font-heading mb-2">Help & safety</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5" /> Payments are held in escrow
                until delivery is confirmed.
              </div>
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5" /> You can open a dispute within
                72h of delivery.
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="h-4 w-4 mt-0.5" /> Cancellations may be partially
                refunded after work begins.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
