import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <section className="mb-[64px]">
      <div className="mb-[20px]">
        <h2>Categories</h2>
        <p>Singers, Producers, DJs, Guitarists, Indie, Hip‑hop, R&B, Lo‑fi</p>
      </div>

      <div className="p-[24px] card flex items-center justify-between gap-[60px]">
        <div>
          <h1 className="font-bricolage-grotesque">Custom sound for your business</h1>
          <p className="text-muted">
            Yoga studios, cafés, salons—get a playlist that matches your brand. Refresh
            monthly with a single click.
          </p>

          <div className="mt-[20px] flex items-center gap-[16px]">
            <Link href="/artists" className="btn btn-primary">
              Explore Artists
            </Link>
            <Link href="/artists" className="btn btn-ghost">
              How it works
            </Link>
          </div>
        </div>
        <div className="lg:block hidden max-w-[450px]">
          <Image
            src="/images/categories/category-img.jpg"
            alt="Categories"
            width={700}
            height={600}
            className="w-full h-full object-cover rounded-[16px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Categories;
