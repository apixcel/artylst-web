import Link from "next/link";

const BusinessHeader = () => {
  return (
    <header className="px-[40px]">
      <nav className="flex items-center justify-between">
        <Link className="text-bold-400 text-primary" href="/">
          BusinessHeader Logo
        </Link>

        {/* nav links */}
        <ul className="flex gap-4">
          <li>
            <Link href="/business">For business</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BusinessHeader;
