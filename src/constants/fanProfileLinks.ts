import { Heart, ShoppingBag, User } from "lucide-react";

export const fanProfileLinks = [
  {
    label: "Profile",
    route: "/profile",
    icon: User,
  },
  {
    label: "Orders",
    route: "/profile/orders",
    icon: ShoppingBag,
  },
  {
    label: "Favorite Artists",
    route: "/profile/fav-artists",
    icon: Heart,
  },
];
