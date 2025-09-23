"use client";

import { fanAvatarFallback } from "@/constants/fallBack";
import { IConversation } from "@/interface/conversation.interface";
import { useGetMyConversationListQuery } from "@/redux/features/conversation/conversation.api";
import dateUtils from "@/utils/date";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import ConversationContainer from "./ConversationContainer";

const MessageView = () => {
  const { data } = useGetMyConversationListQuery(undefined);

  const [conversations, setConversations] = useState<IConversation[]>([]);

  const [selectedConversation, setSelectedConversation] = useState<IConversation>();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (data) {
      setConversations(data.data);
    }
  }, [data]);

  return (
    <section className="space-y-6 flex flex-col h-full">
      <h1 className="text-2xl md:text-3xl font-heading">Messages</h1>

      <div className="flex xl:flex-row flex-col gap-4 xl:h-[78vh]">
        {/* LEFT: Thread list */}
        <div className="rounded-2xl p-4 border border-white/10 bg-white/5 flex flex-col max-w-[370px] w-full">
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
            {conversations.map((t) => (
              <div
                key={t.__v}
                onClick={() => setSelectedConversation(t)}
                className={`w-full text-left rounded-lg cursor-pointer p-3 border transition flex items-center gap-3 ${
                  t._id === selectedConversation?._id
                    ? "bg-white/10 border-white/20"
                    : "hover:bg-white/10 border-transparent"
                }`}
              >
                <div className="w-10 h-10">
                  <img
                    src={t.reciver?.avatar || "/"}
                    onError={(e) => (e.currentTarget.src = fanAvatarFallback)}
                    className="w-full h-full rounded-full"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="truncate text-sm leading-[120%]">
                    {t.reciver?.fullName || "N/A"}
                  </h4>
                  <p className="text-white/60 flex items-center justify-between gap-[8px]">
                    <span className="line-clamp-1">
                      {t.lastMessage?.isMe
                        ? `You: ${t.lastMessage?.text}`
                        : t.lastMessage?.text}
                    </span>

                    <span className="text-[10px] shrink-0">
                      •{" "}
                      {t.lastMessage?.createdAt
                        ? dateUtils.compareDistanceFromNow(t.lastMessage?.createdAt)
                        : ""}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            {conversations.length === 0 && (
              <div className="py-10 text-center text-white/70 text-sm">
                No threads found
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Active conversation */}

        {selectedConversation ? (
          <ConversationContainer
            onMessageSent={(msg) => {
              setConversations((prev) => {
                return prev.map((c) => {
                  if (c._id === selectedConversation?._id) {
                    return {
                      ...c,
                      lastMessage: {
                        isMe: msg.isMe,
                        createdAt: new Date().toISOString(),
                        _id: msg._id,
                        text: msg.text,
                      },
                    };
                  }
                  return c;
                });
              });
            }}
            conversation={selectedConversation}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MessageView;
