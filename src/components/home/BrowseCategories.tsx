import { BrowseSlider } from "@/components";

const favoriteStars = [
  {
    name: "Actors",
    image: "/images/categories/actors.jpg",
    route: "/browse/actors",
  },
  {
    name: "Reality TV",
    image: "/images/categories/reality-tv.jpeg",
    route: "/browse/reality-tv",
  },
  {
    name: "Athletes",
    image: "/images/categories/athletes.jpg",
    route: "/browse/athletes",
  },
  {
    name: "Comedians",
    image: "/images/categories/comedians.png",
    route: "/browse/comedians",
  },
  {
    name: "Creators",
    image: "/images/categories/creators.jpg",
    route: "/browse/creators",
  },
  {
    name: "Wrestlers",
    image: "/images/categories/wrestlers.jpeg",
    route: "/browse/athletes/wrestlers",
  },
  {
    name: "For business",
    image: "/images/categories/for-business.jpg",
    route: "/business",
  },
];

const BrowseCategories = () => {
  return (
    <section className="mb-[64px]">
      <h2 className="mb-[20px]">Categories</h2>

      <BrowseSlider
        items={favoriteStars}
        viewAll={{ href: "/browse", label: "View all" }}
        ariaLabel="Favorite stars carousel"
      />
    </section>
  );
};

export default BrowseCategories;
