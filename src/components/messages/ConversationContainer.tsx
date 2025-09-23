import { businessAvatarFallback } from "@/constants/fallBack";
import { socketEmitMessage } from "@/constants/socketMessageConst";
import { IQueryMutationErrorResponse } from "@/interface";
import { IConversation, IMessage } from "@/interface/conversation.interface";
import { useSocket } from "@/provider/SocketProvider";
import {
  useGetMessagesByConversationIdQuery,
  useSendMessageByConversationMutation,
} from "@/redux/features/conversation/conversation.api";
import { ChevronLeft, LoaderCircle, MoreVertical, Paperclip, Send } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MessageRow from "./MessageRow";
import MessagesSkeleton from "./MessagesSkeleton";

interface IProps {
  conversation: IConversation;
  onMessageSent: (message: IMessage) => void;
  onBack: () => void;
}

const ConversationContainer: React.FC<IProps> = ({
  conversation,
  onMessageSent,
  onBack,
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const [query, setQuery] = useState({
    limit: 10,
    dateCursor: "",
  });

  const { socket } = useSocket();
  const mesgContainerRef = useRef<HTMLDivElement>(null);

  const isPrependingRef = useRef(false);
  const prevScrollHeightRef = useRef(0);

  const mergeUniqueById = (older: IMessage[], current: IMessage[]) => {
    const existing = new Set(current.map((m) => m._id));
    const filteredOlder = older.filter((m) => !existing.has(m._id));
    return [...filteredOlder, ...current];
  };

  const [senMessage, { isLoading: isSendingMessage }] =
    useSendMessageByConversationMutation();

  const { data, isLoading, isFetching } = useGetMessagesByConversationIdQuery({
    conversationId: conversation._id,
    query,
  });

  const meta = data?.meta;

  useEffect(() => {
    if (!data) return;

    if (isPrependingRef.current) {
      // We fetched an older slice -> prepend + dedupe
      setMessages((prev) => mergeUniqueById(data.data, prev));
    } else {
      // Fresh load / conversation change / regular refetch
      setMessages(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    // message received to controller
    const onNewMessage = (data: IMessage) => {
      const msg = {
        ...data,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, msg]);
      onMessageSent?.(msg);
      mesgContainerRef.current?.scrollTo({
        top: mesgContainerRef.current.scrollHeight,
      });
    };

    // message sent successfully
    const onNewMessageSent = (data: Pick<IMessage, "_id" | "isSent">) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === data._id ? { ...msg, isSent: data.isSent } : msg))
      );
    };

    const onMessageDeleted = (data: IMessage) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data._id ? { ...msg, isDeleted: true, text: "" } : msg
        )
      );
    };

    const onMessageReaded = (data: IMessage) => {
      const untilTime = new Date(data.createdAt).getTime();

      setMessages((prev) =>
        prev.map((msg) =>
          !msg.isReaded &&
          (new Date(msg.createdAt).getTime() <= untilTime || msg._id === data._id)
            ? { ...msg, isReaded: true }
            : msg
        )
      );
    };

    socket.on(socketEmitMessage.newMessage, onNewMessage);
    socket.on(socketEmitMessage.newMessageSent, onNewMessageSent);
    socket.on(socketEmitMessage.messageDeleted, onMessageDeleted);
    socket.on(socketEmitMessage.messageReaded, onMessageReaded);

    return () => {
      socket.off(socketEmitMessage.newMessage, onNewMessage);
      socket.off(socketEmitMessage.newMessageSent, onNewMessageSent);
      socket.off(socketEmitMessage.messageDeleted, onMessageDeleted);
      socket.on(socketEmitMessage.messageReaded, onMessageReaded);
    };
  }, [socket, onMessageSent]);

  useLayoutEffect(() => {
    const el = mesgContainerRef.current;
    if (!el) return;

    if (isPrependingRef.current) {
      // Preserve viewport after prepending
      const oldH = prevScrollHeightRef.current;
      const newH = el.scrollHeight;
      el.scrollTop = newH - oldH + el.scrollTop;
      isPrependingRef.current = false;
      prevScrollHeightRef.current = 0;
    } else {
      // Default behavior: stick to bottom for new or initial loads
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const handleScrollTopLoad = () => {
    const el = mesgContainerRef.current;
    if (!el) return;

    const THRESHOLD = 32; // px from top
    if (
      el.scrollTop <= THRESHOLD &&
      meta?.hasMore &&
      meta?.nextCursor &&
      !isPrependingRef.current
    ) {
      // mark prepending and remember current scroll height to maintain position later
      isPrependingRef.current = true;
      prevScrollHeightRef.current = el.scrollHeight;

      // trigger older fetch using dateCursor
      setQuery((q) => ({
        ...q,
        dateCursor: meta.nextCursor as string,
      }));
    }
  };

  const handleSendMessage = async () => {
    const textMsg = text.trim();
    if (!textMsg || isSendingMessage) return;
    setText("");
    const res = await senMessage({
      conversation: conversation._id,
      text: textMsg,
    });

    const err = res?.error as IQueryMutationErrorResponse;
    if (err) {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (!lastMessage) return prev;
        return [
          ...prev.slice(0, prev.length - 1),
          {
            ...lastMessage,
            isError: true,
          },
        ];
      });
      return;
    }
  };

  const myLastUnreadMsg = messages.filter((msg) => !msg.isReaded && !msg.isMe).at(-1);

  return (
    <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between bg-white/10 rounded-t-2xl p-4">
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <button onClick={() => onBack?.()} className="cursor-pointer p-1">
              <ChevronLeft />
            </button>
            <div className="w-10 h-10 shrink-0">
              <img
                src={conversation.reciver?.avatar || "/"}
                alt="avatar"
                width={60}
                height={60}
                className="rounded-full w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = businessAvatarFallback)}
              />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <div className="flex items-center justify-start gap-1 ">
                <h4 className="leading-[100%] line-clamp-1">
                  {conversation.reciver?.fullName || "Unknown"}
                </h4>
                <span className="w-2 h-2 shrink-0 text-brand-4 flex items-center bg-brand-4 rounded-full" />
              </div>
              {conversation.reciver?.userName && <p>@{conversation.reciver?.userName}</p>}
            </div>
          </div>
        </div>
        <button>
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-auto smoothBar">
        {/* Messages list */}

        {isFetching && !isLoading && (
          <div className="flex items-center justify-center w-full py-[5px]">
            <LoaderCircle className="animate-spin w-6 h-6" />
          </div>
        )}
        <div
          ref={mesgContainerRef}
          className="mt-5 flex-1 overflow-auto gap-2 flex flex-col w-full text-sm smoothBar p-4"
          onScroll={handleScrollTopLoad}
        >
          {isLoading ? (
            <MessagesSkeleton />
          ) : (
            messages.map((m) => (
              <MessageRow
                myLastUnreadMsg={myLastUnreadMsg}
                reciver={conversation.reciver}
                key={m._id}
                message={m}
              />
            ))
          )}
        </div>

        {/* Composer */}
        <div className="p-4 mt-3 flex items-end gap-2">
          <label className="py-2.5 !w-10 grid place-items-center rounded-lg bg-white/10 border border-white/10 cursor-pointer h-fit">
            <input type="file" multiple className="hidden" />
            <Paperclip className="h-4 w-4" />
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const textArea = e.currentTarget;
              textArea.style.height = "auto";
              textArea.style.height = `${textArea.scrollHeight}px`;
            }}
            onKeyDown={async (e) => {
              const key = e.key;
              if (key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                await handleSendMessage();
                return;
              }
            }}
            style={{ height: "36px" }}
            className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 resize-y custom-scrollbar w-full outline-none"
            placeholder="Type a message…"
          />
          <button
            onClick={handleSendMessage}
            className="px-3 py-[9px] rounded-lg bg-brand-4/60 inline-flex items-center gap-2 sm:justify-start justify-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationContainer;
