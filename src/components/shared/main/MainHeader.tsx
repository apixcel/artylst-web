import Link from "next/link";

const MainHeader = () => {
  return (
    <header>
      <nav className="flex items-center justify-between">
        {/* logo */}
        <Link className="text-bold-400 text-primary" href="/">
          Artylst
        </Link>

        {/* nav links */}
        <ul className="flex gap-4">
          <li>
            <Link href="/kids">For kids</Link>
          </li>
          <li>
            <Link href="/business">For business</Link>
          </li>
        </ul>

        <Link className="text-blue-500" href="/login">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default MainHeader;
