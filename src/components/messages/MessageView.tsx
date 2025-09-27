"use client";

import { fanAvatarFallback } from "@/constants/fallBack";
import { IConversation } from "@/interface/conversation.interface";
import { useGetMyConversationListQuery } from "@/redux/features/conversation/conversation.api";
import dateUtils from "@/utils/date";
import { MessageCircle, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ConversationContainer from "./ConversationContainer";
import { LeftMessageSkeleton } from "./MessagesSkeleton";

interface IConversationListProps {
  selectedConversation: IConversation | undefined;
  setSelectedConversation: (conversation: IConversation | undefined) => void;
  conversations: IConversation[];
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
}
const ConversationList: React.FC<IConversationListProps> = ({
  selectedConversation,
  setSelectedConversation,
  conversations,
  query,
  setQuery,
  isLoading,
}) => {
  return (
    <div className="rounded-2xl p-4 border border-white/10 bg-white/5 flex flex-col w-full h-full">
      <div className="mt-2 flex items-center gap-2 bg-white/10 border border-white/10 rounded-lg px-3">
        <Search className="h-4 w-4 text-white/60" />
        <input
          className="bg-transparent flex-1 py-2 outline-none text-sm"
          placeholder="Search messages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="mt-3 space-y-2 overflow-auto h-full pr-1 w-full">
        {isLoading ? (
          <>
            <LeftMessageSkeleton />
            <LeftMessageSkeleton />
            <LeftMessageSkeleton />
            <LeftMessageSkeleton />
          </>
        ) : !conversations.length ? (
          <div className="py-10 text-center text-white/70 text-sm">No threads found</div>
        ) : (
          conversations.map((t) => (
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
                <p className="text-white/60 flex items-center justify-start gap-[8px]">
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
          ))
        )}

        {}
      </div>
    </div>
  );
};

const MessageView = () => {
  const { data, isLoading } = useGetMyConversationListQuery(undefined);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<IConversation>();

  const sectionRef = useRef<HTMLElement>(null);

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (data) {
      setConversations(data.data);
    }
  }, [data]);

  const getConversatons = () => {
    const filteredConversations =
      conversations.filter((t) =>
        t.reciver?.fullName?.toLowerCase().includes(query.toLowerCase())
      ) || [];
    return filteredConversations.sort(
      (a, b) =>
        new Date(b.lastMessage?.createdAt).getTime() -
        new Date(a.lastMessage?.createdAt).getTime()
    );
  };

  useEffect(() => {
    const main = document.getElementById("dashboard_main_content");

    if (main && sectionRef.current) {
      main.style.height = "100%";
      const availableHeight = main.offsetHeight - 24 - 24;
      sectionRef.current.style.height = `${availableHeight}px`;
    }

    return () => {
      if (main) {
        main.style.height = "unset";
      }
    };
  }, [selectedConversation]);

  const conversationsList = getConversatons();
  return (
    <section ref={sectionRef} className="gap-6 flex flex-col h-full">
      <h1 className="text-2xl md:text-3xl font-heading shrink-0">Messages</h1>

      <div className="flex flex-row gap-4 max-h-[90%] h-full">
        {/* LEFT: Thread list */}
        <div className="hidden lg:block lg:max-w-[370px] w-full ">
          <ConversationList
            isLoading={isLoading}
            conversations={conversationsList}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            query={query}
            setQuery={setQuery}
          />
        </div>
        {!selectedConversation ? (
          <div className="lg:hidden block lg:max-w-[370px] w-full ">
            <ConversationList
              isLoading={isLoading}
              conversations={conversationsList}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
              query={query}
              setQuery={setQuery}
            />
          </div>
        ) : (
          ""
        )}
        {/* RIGHT: Active conversation */}

        {selectedConversation ? (
          <ConversationContainer
            onBack={() => setSelectedConversation(undefined)}
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
          <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 flex-col items-center justify-center h-full text-center px-4 hidden lg:flex">
            <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <MessageCircle className="w-8 h-8" />
            </span>

            <h2 className="text-lg font-semibold text-white/80">
              No conversation selected
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Select a conversation from the sidebar to start chatting.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MessageView;
