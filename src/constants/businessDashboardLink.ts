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
    route: "/dashboard/business",
    icon: Home,
  },
  {
    label: "Orders",
    route: "/dashboard/business/orders",
    icon: ShoppingBag,
  },
  {
    label: "Messages",
    route: "/dashboard/business/messages",
    icon: MessageCircle,
  },
  {
    label: "Artists",
    route: "/dashboard/business/artists",
    icon: User,
  },
  {
    label: "Favorites",
    route: "/dashboard/business/favorites",
    icon: Heart,
  },

  {
    label: "Receipts",
    route: "/dashboard/business/receipts",
    icon: Receipt,
  },

  {
    label: "Settings",
    route: "/dashboard/business/settings",
    icon: Settings,
  },
];
