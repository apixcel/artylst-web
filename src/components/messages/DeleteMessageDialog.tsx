import { IMessage } from "@/interface/conversation.interface";
import { useDeleteMessageByMessageIdMutation } from "@/redux/features/conversation/conversation.api";
import DialogProvider from "../ui/DialogProvider";

interface IProps {
  message: IMessage;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteMessageDialog: React.FC<IProps> = ({ isOpen, message, setIsOpen }) => {
  const [deleteMsg, { isLoading }] = useDeleteMessageByMessageIdMutation();

  const handleDelete = async () => {
    await deleteMsg(message._id).unwrap();
    setIsOpen(false);
  };

  return (
    <DialogProvider state={isOpen} setState={setIsOpen} className="max-w-[400px] w-full">
      <div className="bg-white/5 rounded-xl p-6">
        <h2 className="text-lg font-semibold">Delete message?</h2>
        <p className="mt-2 text-sm">
          This action <span className="font-medium text-red-500">cannot be undone</span>.
          The message will also be removed for other participants in the conversation.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </DialogProvider>
  );
};

export default DeleteMessageDialog;
