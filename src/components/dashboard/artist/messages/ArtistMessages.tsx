"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Paperclip,
  Send,
  MoreVertical,
  CheckCheck,
  Check,
  AlertTriangle,
  FileText,
} from "lucide-react";
import { businessAvatarFallback } from "@/constants/fallBack";
import Image from "next/image";

// -------------------------------------------------
// Demo data (swap with your API)
// -------------------------------------------------

type Status = "in_progress" | "delivered" | "revisions" | "disputed";

type Thread = {
  id: number;
  orderId: number;
  artist: string;
  avatar: string;
  status: Status;
  lastMessage: string;
  updatedAt: string; // e.g., "2h ago"
  unread: number;
};

type Message = {
  id: string | number;
  from: "me" | "them";
  text?: string;
  fileName?: string;
  ts: string; // display timestamp, keep simple for demo
  read?: boolean; // for "me" messages
};

const THREADS: Thread[] = [
  {
    id: 1,
    orderId: 2341,
    artist: "Sloane Rivers",
    avatar: "https://i.pravatar.cc/100?img=44",
    status: "in_progress",
    lastMessage: "Got it! Working on a mellow vibe.",
    updatedAt: "2h ago",
    unread: 1,
  },
  {
    id: 2,
    orderId: 2339,
    artist: "Marta",
    avatar: "https://i.pravatar.cc/100?img=12",
    status: "delivered",
    lastMessage: "Delivery sent. Let me know if you need tweaks!",
    updatedAt: "Yesterday",
    unread: 0,
  },
  {
    id: 3,
    orderId: 2338,
    artist: "Noah Lane",
    avatar: "https://i.pravatar.cc/100?img=23",
    status: "revisions",
    lastMessage: "Pushed tempo to 120 BPM as requested.",
    updatedAt: "1h ago",
    unread: 0,
  },
];

const MESSAGES: Record<number, Message[]> = {
  1: [
    { id: "m1", from: "them", text: "Hi! Thanks for the brief 🙌", ts: "10:10" },
    { id: "m2", from: "me", text: "Awesome! Waiting 🤘", ts: "10:12", read: true },
    { id: "m3", from: "them", text: "Got it! Working on a mellow vibe.", ts: "12:05" },
  ],
  2: [
    {
      id: "m1",
      from: "them",
      text: "Delivery sent. Let me know if you need tweaks!",
      ts: "Yesterday",
    },
    {
      id: "m2",
      from: "me",
      text: "Thanks! Reviewing today.",
      ts: "Today 09:05",
      read: true,
    },
  ],
  3: [
    { id: "m1", from: "me", text: "Can we raise the tempo?", ts: "09:00", read: true },
    {
      id: "m2",
      from: "them",
      text: "Pushed tempo to 120 BPM as requested.",
      ts: "11:20",
    },
  ],
};

// -------------------------------------------------
// Small UI helpers
// -------------------------------------------------

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

const StatusChip = ({ status }: { status: Status }) => {
  const map: Record<Status, { label: string; cls: string }> = {
    in_progress: {
      label: "In progress",
      cls: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    delivered: {
      label: "Delivered",
      cls: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    revisions: {
      label: "Revisions",
      cls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    disputed: { label: "Disputed", cls: "bg-red-500/10 text-red-500 border-red-500/20" },
  };
  const s = map[status];
  return <Chip className={s.cls}>{s.label}</Chip>;
};

// -------------------------------------------------
// Main component
// -------------------------------------------------

const ArtistMessages = () => {
  const [threads] = useState<Thread[]>(THREADS);
  const [activeId, setActiveId] = useState<number>(threads[0]?.id ?? 1);
  const [query, setQuery] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [composer, setComposer] = useState("");
  const [typing, setTyping] = useState(false); // fake typing indicator demo

  const listRef = useRef<HTMLDivElement>(null);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeId)!,
    [threads, activeId]
  );
  const [messages, setMessages] = useState<Message[]>(MESSAGES[activeId] || []);

  // When switching threads, load messages and scroll to bottom
  useEffect(() => {
    setMessages(MESSAGES[activeId] || []);
    setTimeout(
      () =>
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        }),
      50
    );
  }, [activeId]);

  // Simulate artist typing briefly when you focus composer
  useEffect(() => {
    if (!composer) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(t);
  }, [composer]);

  const filteredThreads = useMemo(() => {
    return threads.filter((t) => {
      const hit = `${t.orderId} ${t.artist} ${t.lastMessage}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const unreadOk = !showUnreadOnly || t.unread > 0;
      return hit && unreadOk;
    });
  }, [threads, query, showUnreadOnly]);

  const quickReplies = [
    "Thanks for the update!",
    "Can you lower explicit content?",
    "Please add 3 more upbeat tracks.",
    "What’s the ETA?",
  ];

  const sendMessage = () => {
    if (!composer.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "me",
      text: composer.trim(),
      ts: "Now",
      read: false,
    };
    setMessages((prev) => [...prev, newMsg]);
    setComposer("");
    setTimeout(
      () =>
        listRef.current?.scrollTo({
          top: listRef.current.scrollHeight,
          behavior: "smooth",
        }),
      50
    );
  };

  return (
    <section className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-heading">Messages</h1>

      <div className="grid xl:grid-cols-3 gap-4">
        {/* LEFT: Thread list */}
        <div className="rounded-2xl p-4 border border-white/10 bg-white/5 flex flex-col">
          <div className="mt-2 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
            <Search className="h-4 w-4 text-white/60" />
            <input
              className="bg-transparent flex-1 py-2 outline-none text-sm"
              placeholder="Search messages"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <label className="mt-2 inline-flex items-center gap-2 text-xs text-white/70 cursor-pointer select-none">
            <input
              type="checkbox"
              className="accent-white/80"
              checked={showUnreadOnly}
              onChange={(e) => setShowUnreadOnly(e.target.checked)}
            />
            Unread only
          </label>

          <div className="mt-3 space-y-2 overflow-auto max-h-[540px] pr-1">
            {filteredThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full text-left rounded-lg p-3 border transition flex items-center gap-3 ${
                  t.id === activeId
                    ? "bg-white/10 border-white/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div
                  className="h-10 w-10 rounded-xl bg-cover bg-center"
                  style={{ backgroundImage: `url(${t.avatar})` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-heading truncate">
                      #{t.orderId} • {t.artist}
                    </div>
                    <div className="text-[11px] text-white/50 whitespace-nowrap">
                      {t.updatedAt}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StatusChip status={t.status} />
                    {t.unread > 0 && (
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/30 border border-white/10">
                        {t.unread}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-white/60 mt-1 truncate">
                    {t.lastMessage}
                  </div>
                </div>
              </button>
            ))}

            {filteredThreads.length === 0 && (
              <div className="py-10 text-center text-white/70 text-sm">
                No threads found
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Active conversation */}
        <div className="xl:col-span-2 rounded-2xl border border-white/10 bg-white/5 flex flex-col min-h-[620px]">
          {/* Header */}
          <div className="flex items-start justify-between bg-white/10 rounded-t-2xl p-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10">
                  <Image
                    src={businessAvatarFallback}
                    alt="avatar"
                    width={60}
                    height={60}
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
                <h4>Jonathan Smith</h4>
              </div>

              <div>
                <div className="text-sm text-white/60">
                  #{activeThread.orderId} • {activeThread.artist}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <StatusChip status={activeThread.status} />
                  <Link
                    href={`/orders/${activeThread.orderId}`}
                    className="text-xs underline inline-flex items-center gap-1"
                  >
                    <FileText className="h-3.5 w-3.5" /> View order
                  </Link>
                  {activeThread.status === "delivered" && (
                    <button className="text-xs underline inline-flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" /> Request revision
                    </button>
                  )}
                </div>
              </div>
            </div>
            <button className="px-2 py-1 rounded-lg bg-white/10 border border-white/10 text-xs inline-flex items-center gap-1">
              <MoreVertical className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="p-4">
            {/* Messages list */}
            <div ref={listRef} className="mt-5 flex-1 overflow-auto space-y-1 text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[80%] flex gap-2 ${m.from === "me" ? "justify-end ml-auto" : ""}`}
                >
                  <div
                    className={`p-3 rounded-lg border w-max ${
                      m.from === "me"
                        ? "bg-brand-4/20 border-white/10"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {m.text && <div>{m.text}</div>}
                    {m.fileName && (
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        <span>{m.fileName}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-white/50 mt-1 flex items-center gap-1 justify-end">
                    {m.from === "me" &&
                      (m.read ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : (
                        <Check className="h-3 w-3" />
                      ))}
                    <span>{m.ts}</span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="max-w-[80%]">
                  <div className="p-3 rounded-lg border bg-white/5 border-white/10 w-max">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                  <div className="text-[11px] text-white/50 mt-1">Typing…</div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="mt-3 flex flex-wrap gap-2">
              {quickReplies.map((t) => (
                <button
                  key={t}
                  onClick={() => setComposer((prev) => (prev ? prev + " " : "") + t)}
                  className="px-2.5 py-1 rounded-full text-xs border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Composer */}
            <div className="mt-3 flex items-end gap-2">
              <label className="h-10 w-10 grid place-items-center rounded-lg bg-white/10 border border-white/10 cursor-pointer">
                <input type="file" multiple className="hidden" />
                <Paperclip className="h-4 w-4" />
              </label>
              <textarea
                className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 resize-y custom-scrollbar"
                placeholder="Type a message…"
                value={composer}
                onChange={(e) => setComposer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 rounded-lg bg-brand-4/60 inline-flex items-center gap-2"
              >
                <Send className="h-4 w-4" /> Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistMessages;
