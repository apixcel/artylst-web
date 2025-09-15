import { Heart, Settings, ShoppingBag } from "lucide-react";

export const fanProfileLinks = [
  {
    label: "Orders",
    route: "/profile/orders",
    icon: ShoppingBag,
  },

  {
    label: "Settings",
    route: "/profile/settings",
    icon: Settings,
  },
  {
    label: "Favorite Artists",
    route: "/profile/fav-artists",
    icon: Heart,
  },
];
