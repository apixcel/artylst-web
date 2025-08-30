import {
  HomeHero,
  PrivacyStrip,
  Categories,
  GiftsForEveryBudget,
  PersonalizedPlaylists,
  TopArtists,
  RecentReviews,
  ThisIsArtylist,
  InstantPlaylists,
  FAQ,
  HomeHowItWorks,
  HomeRecentlyViewed,
} from "@/components";

const faqs = [
  {
    q: "Which platforms do you support?",
    a: "Spotify, Apple Music, YouTube Music — the artist will deliver a private link.",
  },
  {
    q: "How long does delivery take?",
    a: "Most orders are delivered within 2–5 business days depending on scope. You'll see an ETA at checkout and get updates by email.",
  },
  {
    q: "Do you share personal contact info?",
    a: "No. We keep communication inside the platform for safety and privacy.",
  },
  {
    q: "What if I need a revision?",
    a: "You can request revisions within 7 days of delivery. Minor fixes are usually turned around in 24–48 hours.",
  },
  {
    q: "Can I cancel an order?",
    a: "Yes, you can cancel before the artist has started working. Once work has begun, cancellations may be subject to partial refunds depending on progress.",
  },
  {
    q: "How do payments work?",
    a: "All payments are handled securely through our platform. Funds are held in escrow and only released to the artist once the order is completed and approved.",
  },
  {
    q: "Do artists retain rights to the music?",
    a: "Yes. Unless you’ve purchased a business or exclusive license, artists retain copyright ownership. You’re buying usage rights as outlined in the tier you select.",
  },
  {
    q: "Can I request a specific genre or vibe?",
    a: "Definitely. At checkout, you can specify mood, tempo, and inspirations to help the artist tailor the playlist or track to your preferences.",
  },
  {
    q: "What happens if the artist misses the deadline?",
    a: "If an artist fails to deliver on time, you’ll receive an updated ETA. If they cannot complete the order, you’ll be fully refunded.",
  },
  {
    q: "Is there support if I have an issue?",
    a: "Yes. Our support team is available by email or chat for order issues, disputes, or general questions.",
  },
];

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <PrivacyStrip />
      <PersonalizedPlaylists />
      <TopArtists />
      <InstantPlaylists />
      <HomeRecentlyViewed />
      <HomeHowItWorks />
      <GiftsForEveryBudget />
      <RecentReviews />
      <Categories />
      <ThisIsArtylist />
      <FAQ items={faqs} columns={2} breakpoint="md" />
    </div>
  );
};

export default HomePage;
