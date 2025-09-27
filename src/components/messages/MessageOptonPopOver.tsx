"use client";

import { IMessage } from "@/interface/conversation.interface";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import DeleteMessageDialog from "./DeleteMessageDialog";

interface IProps {
  message: IMessage;
}
const MessageOptionPopOver: React.FC<IProps> = ({ message }) => {
  const [isDeleMsgOpen, setIsDeleMsgOpen] = useState(false);

  return (
    <>
      <Popover className="relative">
        <PopoverButton className="cursor-pointer outline-none text-white/50 w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10">
          <EllipsisVertical className="h-5 w-5" />
        </PopoverButton>

        <PopoverPanel
          anchor="bottom end"
          className="z-50 mt-2 w-[150px] rounded-xl  bg-[#394748] p-1 shadow-lg focus:outline-none"
        >
          <div className="flex flex-col text-sm">
            <button
              onClick={() => setIsDeleMsgOpen(true)}
              className="rounded-lg px-3 py-2 text-start cursor-pointer hover:bg-white/10"
            >
              Delete Message
            </button>
          </div>
        </PopoverPanel>
      </Popover>

      <DeleteMessageDialog
        isOpen={isDeleMsgOpen}
        setIsOpen={setIsDeleMsgOpen}
        message={message}
      />
    </>
  );
};

export default MessageOptionPopOver;
