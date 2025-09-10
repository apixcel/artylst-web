import {
  Heart,
  Home,
  MessageCircle,
  Receipt,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

export const businessDashboardLink = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: Home,
  },
  {
    label: "Orders",
    route: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    label: "Messages",
    route: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    label: "Artists",
    route: "/dashboard/artists",
    icon: User,
  },
  {
    label: "Favorites",
    route: "/dashboard/favorites",
    icon: Heart,
  },

  {
    label: "Receipts",
    route: "/dashboard/receipts",
    icon: Receipt,
  },

  {
    label: "Settings",
    route: "/dashboard/settings",
    icon: Settings,
  },
];
