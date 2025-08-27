import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MobTopBar = () => {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between border-b bg-gray-50 p-4">
        {/* menu button */}
        <button>
          <AlignJustify />
        </button>
        {/* logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src="/logo.svg" alt="AIDeligate" width={100} height={100} />
          </Link>
        </div>
        {/* user profile */}
        <div className="w-8"></div>
      </div>
    </div>
  );
};

export default MobTopBar;
