import { businessAvatarFallback } from "@/constants/fallBack";
import { IConversationreciver, IMessage } from "@/interface/conversation.interface";
import { useReadMessageByMessageIdMutation } from "@/redux/features/conversation/conversation.api";
import dateUtils from "@/utils/date";
import { isImageUrl, isVideoUrl } from "@/utils/queryParams";
import { Ban, Check, CheckCheck, Circle, CircleAlert, Paperclip } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
import MessageOptionPopOver from "./MessageOptonPopOver";

const MessageRow = ({
  message,
  reciver,
  myLastUnreadMsg,
}: {
  message: IMessage;
  reciver: IConversationreciver;
  myLastUnreadMsg?: IMessage;
}) => {
  const [markMessageAsRead] = useReadMessageByMessageIdMutation();

  useEffect(() => {
    if (myLastUnreadMsg && myLastUnreadMsg._id === message._id) {
      markMessageAsRead(myLastUnreadMsg?._id);
    }
  }, [myLastUnreadMsg]);

  return (
    <div
      key={message?._id}
      className={`w-[80%] flex gap-2 items-center  group/message ${
        message?.isMe ? "justify-end ml-auto" : ""
      }`}
    >
      {!message?.isMe && (
        <div className="w-6 h-6 shrink-0">
          <img
            src={reciver?.avatar || "/"}
            alt="avatar"
            width={60}
            height={60}
            className="rounded-full w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = businessAvatarFallback)}
          />
        </div>
      )}
      <div
        className={`flex flex-col gap-[2px] ${message?.isMe ? "items-end" : "items-start"}`}
      >
        <div
          className={`flex justify-center items-center gap-2 ${message?.isMe ? "" : "flex-row-reverse"}`}
        >
          {message?.isMe && !message?.isDeleted ? (
            <div className="opacity-0 group-hover/message:opacity-100">
              <MessageOptionPopOver message={message} />
            </div>
          ) : (
            ""
          )}
          {message?.isDeleted ? (
            <div className="p-3 py-2 rounded-lg w-max bg-white/20 flex items-center justify-center gap-1 text-white/60 italic">
              <Ban className="h-4 w-4" /> <span>Message Deleted</span>
            </div>
          ) : (
            <>
              {message?.file ? (
                isImageUrl(message?.file) ? (
                  <div className="max-w-[250px] w-full mb-1">
                    <Image
                      src={message?.file}
                      width={200}
                      height={300}
                      alt="file"
                      className="w-full object-contain rounded-2xl"
                    />
                  </div>
                ) : isVideoUrl(message?.file) ? (
                  <div className="max-w-[250px] w-full mb-1">
                    <video
                      src={message?.file}
                      width={200}
                      height={300}
                      controls
                      className="w-full object-contain rounded-2xl"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    <span>{"Attachment.file"}</span>
                  </div>
                )
              ) : message?.text ? (
                <p
                  className={`p-3 py-2 rounded-lg border w-full ${
                    message?.isMe
                      ? message?.isError
                        ? "bg-red-500/20 border-red-500"
                        : "bg-brand-4/20 border-white/10"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {message?.text.split("\n").map((line, i) => (
                    <>
                      {line}
                      <br />
                    </>
                  ))}
                </p>
              ) : (
                ""
              )}
            </>
          )}
        </div>

        <div className="text-[11px] text-white/50 flex items-center gap-1 justify-end">
          <span>
            {dateUtils.compareDistanceFromNow(message?.createdAt || new Date())}
          </span>{" "}
          {message?.isMe &&
            (message?.isReaded ? (
              <CheckCheck className="h-3 w-3" />
            ) : message?.isError ? (
              <CircleAlert className="h-3 w-3 text-red-500" />
            ) : message?.isSent ? (
              <Check className="h-3 w-3" />
            ) : (
              <Circle className="h-3 w-3" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MessageRow;
