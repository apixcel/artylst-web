import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-dvh">
      <LoaderCircle className="animate-spin w-6 h-6" />
    </div>
  );
};

export default Loading;
