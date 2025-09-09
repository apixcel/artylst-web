import { LoaderCircle } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface IProps {
  className?: string;
}
const Loader: React.FC<IProps> = ({ className }) => {
  return (
    <div className={twMerge("flex items-center justify-center w-full h-dvh", className)}>
      <LoaderCircle className="animate-spin w-6 h-6" />
    </div>
  );
};

export default Loader;
