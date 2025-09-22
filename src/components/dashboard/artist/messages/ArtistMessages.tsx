"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, Paperclip, Send, MoreVertical, CheckCheck, Check } from "lucide-react";
import { businessAvatarFallback } from "@/constants/fallBack";
import Image from "next/image";

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

const ArtistMessages = () => {
  const [threads] = useState<Thread[]>(THREADS);
  const [activeId, setActiveId] = useState<number>(threads[0]?.id ?? 1);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState("");
  const [typing, setTyping] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(MESSAGES[activeId] || []);

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

  useEffect(() => {
    if (!composer) return;
    setTyping(true);
    const t = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(t);
  }, [composer]);

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
    <section className="space-y-6 flex flex-col h-full">
      <h1 className="text-2xl md:text-3xl font-heading">Messages</h1>

      <div className="flex xl:flex-row flex-col gap-4 xl:h-[78vh]">
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

          <div className="mt-3 space-y-2 overflow-auto max-h-[540px] pr-1">
            {threads.map((t) => (
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
                    <div className="font-heading truncate">{t.artist}</div>
                    <div className="text-[11px] text-white/50 whitespace-nowrap">
                      {t.updatedAt}
                    </div>
                  </div>
                  <div className="text-xs text-white/60 mt-1 truncate">
                    {t.lastMessage}
                  </div>
                </div>
              </button>
            ))}

            {threads.length === 0 && (
              <div className="py-10 text-center text-white/70 text-sm">
                No threads found
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Active conversation */}
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between bg-white/10 rounded-t-2xl p-4">
            <div className="flex gap-2">
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
                <div className="flex gap-2 items-start">
                  <div>
                    <h4>Jonathan Smith</h4>
                    <p>@jsmith</p>
                  </div>

                  <span className="text-xs text-brand-4 flex items-center gap-1 border border-brand-4 rounded-full px-2 py-[2px]">
                    <span className="w-[5px] h-[5px] bg-brand-4 rounded-full" />
                    Online
                  </span>
                </div>
              </div>
            </div>
            <button>
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 flex flex-col flex-1">
            {/* Messages list */}
            <div ref={listRef} className="mt-5 flex-1 overflow-auto space-y-1 text-sm">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[80%] flex gap-2 items-center ${m.from === "me" ? "justify-end ml-auto" : ""}`}
                >
                  {m.from === "them" && (
                    <div className="w-6 h-6">
                      <Image
                        src={businessAvatarFallback}
                        alt="avatar"
                        width={60}
                        height={60}
                        className="rounded-full w-full h-full object-cover"
                      />
                    </div>
                  )}
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
            <div className="mt-3 flex sm:flex-row flex-col sm:items-end gap-2">
              <div className="flex gap-2 flex-1">
                <label className="py-2.5 !w-10 grid place-items-center rounded-lg bg-white/10 border border-white/10 cursor-pointer">
                  <input type="file" multiple className="hidden" />
                  <Paperclip className="h-4 w-4" />
                </label>
                <input
                  className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 resize-y custom-scrollbar w-full"
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
              </div>
              <button
                onClick={sendMessage}
                className="px-3 py-[9px] rounded-lg bg-brand-4/60 inline-flex items-center gap-2 sm:justify-start justify-center"
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
