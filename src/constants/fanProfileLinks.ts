import { Settings, ShoppingBag, User, UserStar } from "lucide-react";

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
    label: "Settings",
    route: "/profile/settings",
    icon: Settings,
  },
  {
    label: "Favorite Artists",
    route: "/profile/fav-artists",
    icon: UserStar,
  },
];
