import { businessAvatarFallback } from "@/constants/fallBack";
import { socketEmitMessage } from "@/constants/socketMessageConst";
import { IQueryMutationErrorResponse } from "@/interface";
import { IConversation, IMessage } from "@/interface/conversation.interface";
import { useSocket } from "@/provider/SocketProvider";
import {
  useGetMessagesByConversationIdQuery,
  useSendMessageByConversationMutation,
} from "@/redux/features/conversation/conversation.api";
import dateUtils from "@/utils/date";
import {
  Check,
  CheckCheck,
  Circle,
  CircleAlert,
  MoreVertical,
  Paperclip,
  Send,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MessagesSkeleton from "./MessagesSkeleton";

interface IProps {
  conversation: IConversation;
  onMessageSent: (message: IMessage) => void;
}

const ConversationContainer: React.FC<IProps> = ({ conversation, onMessageSent }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const { socket } = useSocket();
  const mesgContainerRef = useRef<HTMLDivElement>(null);

  const [senMessage, { isLoading: isSendingMessage }] =
    useSendMessageByConversationMutation();
  const { data, isLoading } = useGetMessagesByConversationIdQuery({
    conversationId: conversation._id,
    query: { limit: 30 },
  });

  useEffect(() => {
    if (data) {
      setMessages(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      // message received to controller
      socket.on(socketEmitMessage.newMessage, (data: IMessage) => {
        const msg = {
          ...data,

          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, msg]);
        onMessageSent?.(msg);
        mesgContainerRef.current?.scrollTo({
          top: mesgContainerRef.current.scrollHeight,
        });
      });

      // message sent successfully
      socket.on(
        socketEmitMessage.newMessageSent,
        (data: Pick<IMessage, "_id" | "isSent">) => {
          console.log(data);

          setMessages((prev) =>
            prev.map((msg) => {
              if (msg._id === data._id) {
                return {
                  ...msg,
                  isSent: data.isSent,
                };
              }
              return msg;
            })
          );
        }
      );
    }
    return () => {
      if (socket) {
        socket.off(socketEmitMessage.newMessage);
        socket.off(socketEmitMessage.newMessageSent);
      }
    };
  }, [socket]);

  useLayoutEffect(() => {
    const el = mesgContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight; // or: el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages]);

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

  return (
    <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between bg-white/10 rounded-t-2xl p-4">
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10">
              <img
                src={conversation.reciver?.avatar || "/"}
                alt="avatar"
                width={60}
                height={60}
                className="rounded-full w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = businessAvatarFallback)}
              />
            </div>
            <div className="flex gap-2 items-start">
              <div>
                <h4>{conversation.reciver?.fullName || "Unknown"}</h4>

                {conversation.reciver?.userName && (
                  <p>@{conversation.reciver?.userName}</p>
                )}
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

      <div className="flex flex-col flex-1 overflow-auto smoothBar">
        {/* Messages list */}
        <div
          ref={mesgContainerRef}
          className="mt-5 flex-1 overflow-auto gap-2 flex flex-col w-full text-sm smoothBar p-4"
        >
          {isLoading ? (
            <MessagesSkeleton />
          ) : (
            messages.map((m) => (
              <div
                key={m._id}
                className={`max-w-[80%] flex gap-2 items-center ${m.isMe ? "justify-end ml-auto" : ""}`}
              >
                {!m.isMe && (
                  <div className="w-6 h-6">
                    <img
                      src={conversation.reciver?.avatar || "/"}
                      alt="avatar"
                      width={60}
                      height={60}
                      className="rounded-full w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = businessAvatarFallback)}
                    />
                  </div>
                )}
                <div
                  className={`flex flex-col gap-[2px] ${m.isMe ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-3 rounded-lg border w-max ${
                      m.isMe
                        ? m.isError
                          ? "bg-red-500/20 border-red-500"
                          : "bg-brand-4/20 border-white/10"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {m.text && (
                      <p>
                        {m.text.split("\n").map((line) => (
                          <>
                            {line}
                            <br />
                          </>
                        ))}
                      </p>
                    )}
                    {m.file && (
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        <span>{"Attachment.file"}</span>
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-white/50 flex items-center gap-1 justify-end">
                    <span>
                      {dateUtils.compareDistanceFromNow(m.createdAt || new Date())}
                    </span>{" "}
                    {m.isMe &&
                      (m.isReaded ? (
                        <CheckCheck className="h-3 w-3" />
                      ) : m.isError ? (
                        <CircleAlert className="h-3 w-3 text-red-500" />
                      ) : m.isSent ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <Circle className="h-3 w-3" />
                      ))}
                  </div>
                </div>
              </div>
            ))
          )}

          {/* {typing && (
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
          )} */}
        </div>

        {/* Composer */}
        <div className="p-4 mt-3 flex sm:flex-row flex-col sm:items-end gap-2">
          <div className="flex gap-2 flex-1 items-end">
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
          </div>
          <button
            onClick={handleSendMessage}
            className="px-3 py-[9px] rounded-lg bg-brand-4/60 inline-flex items-center gap-2 sm:justify-start justify-center"
          >
            <Send className="h-4 w-4" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationContainer;
