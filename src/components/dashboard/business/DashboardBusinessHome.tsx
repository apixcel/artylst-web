"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Plus,
  FileText,
  MessageSquare,
  Search,
  Bell,
  X,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Image from "next/image";

const spendData = [
  { name: "Jul 1", spend: 80 },
  { name: "Jul 8", spend: 120 },
  { name: "Jul 15", spend: 60 },
  { name: "Jul 22", spend: 140 },
  { name: "Jul 29", spend: 90 },
  { name: "Aug 5", spend: 160 },
  { name: "Aug 12", spend: 110 },
  { name: "Aug 19", spend: 180 },
  { name: "Aug 26", spend: 95 },
];

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

const Card = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <div className={`rounded-2xl p-5 border border-white/10 bg-white/5 ${className}`}>
    {children}
  </div>
);

const DashboardBusinessHome = () => {
  return (
    <section className="space-y-6">
      {/* Announcements / System notice */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-r from-brand-2/15 to-brand-6/15 p-4 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <Bell className="h-4 w-4 mt-0.5" />
          <div>
            <p className="text-[16px]">Heads up!</p>
            <p className="text-muted">
              Artylst payouts are processed daily at 6pm. Dispute window for delivered
              orders is <span className="font-medium">72h</span>.
            </p>
          </div>
        </div>

        <button className="cursor-pointer">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Header */}
      <h1 className="dashboard-title">Welcome back, Arif</h1>

      {/* KPI cards */}
      <div>
        <div className="grid sm:grid-cols-4 md:grid-cols-3 gap-4">
          <Card className="md:col-span-1 sm:col-span-2 text-center">
            <div className="text-muted text-sm">Active orders</div>
            <div className="text-2xl font-heading mt-1">2</div>
            <div className="text-xs text-muted mt-2">On track: 2 • Due today: 1</div>
          </Card>
          <Card className="md:col-span-1 sm:col-span-2 text-center">
            <div className="text-muted text-sm">Delivered</div>
            <div className="text-2xl font-heading mt-1">8</div>
            <div className="text-xs text-muted mt-2">Pending review: 2</div>
          </Card>
          <Card className="md:col-span-1 sm:col-span-2 sm:col-start-2 text-center">
            <div className="text-muted text-sm">Revisions</div>
            <div className="text-2xl font-heading mt-1">1</div>
            <div className="text-xs text-muted mt-2">Avg. turnaround: 2d</div>
          </Card>
        </div>
      </div>

      {/* Two-column: Left (In progress + Deadlines), Right (Spend chart + Activity) */}
      <div className="grid desktop:grid-cols-3 gap-4 items-stretch">
        <div className="desktop:col-span-2 flex flex-col gap-4 self-stretch">
          {/* Quick actions */}
          <div className="grid sm:grid-cols-4 gap-3">
            <Link
              href="/dashboard/business/orders"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition flex items-center justify-between"
            >
              <div>
                <div className="font-logam">New Order</div>
                <div className="text-xs text-muted">Create a brief</div>
              </div>
              <Plus className="h-4 w-4" />
            </Link>
            <Link
              href="/artists"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition flex items-center justify-between"
            >
              <div>
                <div className="font-logam">Browse Artists</div>
                <div className="text-xs text-muted">Find the right vibe</div>
              </div>
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard/business/messages"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition flex items-center justify-between"
            >
              <div>
                <div className="font-logam">Messages</div>
                <div className="text-xs text-muted">Reply faster</div>
              </div>
              <MessageSquare className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard/business/receipts"
              className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition flex items-center justify-between"
            >
              <div>
                <div className="font-logam">Receipts</div>
                <div className="text-xs text-muted">Download invoices</div>
              </div>
              <FileText className="h-4 w-4" />
            </Link>
          </div>

          {/* In progress */}
          <div className="space-y-4">
            <Card>
              <div className="flex items-center justify-between">
                <div className="font-logam">In progress</div>
                <Link
                  href="/dashboard/business/orders"
                  className="text-sm text-muted hover:underline flex items-center gap-1"
                >
                  View all <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl p-4 border border-white/10 bg-white/5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[url('https://i.pravatar.cc/100?img=44')] bg-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-logam truncate">Order #2341 • Sloane Rivers</div>
                    <div className="text-xs text-muted flex items-center flex-wrap gap-2 mt-1">
                      <span>ETA: Aug 28</span>
                      <Chip>In progress</Chip>
                      <Chip className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                        Due in 1d
                      </Chip>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/business/orders/2341"
                    className="px-3 py-2 rounded-lg bg-white/10"
                  >
                    Open
                  </Link>
                </div>
                <div className="rounded-xl p-4 border border-white/10 bg-white/5 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[url('https://i.pravatar.cc/100?img=12')] bg-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="font-logam truncate">Order #2342 • Marta</div>
                    <div className="text-xs text-muted flex items-center flex-wrap gap-2 mt-1">
                      <span>ETA: Aug 31</span>
                      <Chip>In progress</Chip>
                      <Chip className="bg-green-500/10 text-green-500 border-green-500/20">
                        On track
                      </Chip>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/business/orders/2342"
                    className="px-3 py-2 rounded-lg bg-white/10"
                  >
                    Open
                  </Link>
                </div>
              </div>
            </Card>

            {/* Upcoming deadlines */}
            <Card>
              <div className="font-logam mb-3">Upcoming deadlines</div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">#2341 • Sloane Rivers</div>
                    <Chip className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                      1d left
                    </Chip>
                  </div>
                  <div className="text-muted mt-1">Due Aug 28 • Spotify</div>
                </div>
                <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">#2342 • Marta</div>
                    <Chip className="bg-green-500/10 text-green-500 border-green-500/20">
                      3d left
                    </Chip>
                  </div>
                  <div className="text-muted mt-1">Due Aug 31 • Apple Music</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-4 flex flex-col self-stretch">
          {/* Spend snapshot */}
          <Card>
            <div className="font-logam">Spending (Last 60 days)</div>
            <div className="h-40 mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={spendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#cbd5e1" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#cbd5e1" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(5, 202, 151, 0.2)",
                      border: "1px solid rgba(5, 202, 151, 0.4)",
                      borderRadius: 12,
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="spend"
                    stroke="var(--color-brand-4)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-3 text-sm text-muted">
              <div>MTD: $435</div>
              <div>Avg/Order: $86</div>
            </div>
          </Card>

          {/* Recent activity */}
          <Card>
            <div className="font-logam">Recent activity</div>
            <div className="mt-3 space-y-3 text-sm">
              <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                <span className="font-medium">Order #2339</span> delivered by{" "}
                <span className="font-medium">Marta</span> —{" "}
                <span className="text-white/60">2h ago</span>
              </div>
              <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                New message from <span className="font-medium">Sloane Rivers</span> —{" "}
                <span className="text-white/60">5h ago</span>
              </div>
              <div className="rounded-lg p-3 bg-white/5 border border-white/10">
                Payment processed for <span className="font-medium">#2339</span> —{" "}
                <span className="text-white/60">Yesterday</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="font-logam">Recommended for your business</div>
          <div className="text-sm text-white/70">Based on Café & Workplace vibes</div>
        </div>
        <div className="grid sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {[60, 61, 62, 63].map((n) => (
            <Link
              key={n}
              href={`/artists/${n}`}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/10"
            >
              <Image
                src={`https://i.pravatar.cc/300?img=${n}`}
                alt={`Artist ${n}`}
                width={160}
                height={160}
                className={`h-40 rounded-xl w-full object-cover`}
              />
              <div className="mt-3 font-logam">Artist {n}</div>
              <div className="text-xs text-white/60">@handle{n}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip>Lo-fi</Chip>
                <Chip>Chill</Chip>
                <Chip>Business-friendly</Chip>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Tips & resources */}
      <Card>
        <div className="font-logam mb-3">Tips & resources</div>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <Link
            href="/learn/better-briefs"
            className="rounded-xl p-4 border border-white/10 bg-white/5 hover:bg-white/10"
          >
            <div className="font-medium">How to write a great brief</div>
            <div className="text-white/60 mt-1">
              Get better results with clearer mood & occasion
            </div>
          </Link>
          <Link
            href="/learn/business-playlists"
            className="rounded-xl p-4 border border-white/10 bg-white/5 hover:bg-white/10"
          >
            <div className="font-medium">Best practices for business playlists</div>
            <div className="text-white/60 mt-1">
              Licensing, explicit filters, refresh cadence
            </div>
          </Link>
          <Link
            href="/learn/integrations"
            className="rounded-xl p-4 border border-white/10 bg-white/5 hover:bg-white/10"
          >
            <div className="font-medium">Connect Spotify / Apple Music</div>
            <div className="text-white/60 mt-1">Seamless handoff to your locations</div>
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default DashboardBusinessHome;
