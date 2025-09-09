import {
  Heart,
  Home,
  MessageCircle,
  Receipt,
  Settings,
  ShoppingBag,
  User,
  Truck,
  DollarSign,
  Layers,
  Clock,
  PlayCircle,
  IdCard,
} from "lucide-react";

export const artistDashboardLink = [
  {
    label: "Dashboard",
    route: "/dashboard/artist",
    icon: Home,
  },
  {
    label: "Orders",
    route: "/dashboard/artist/orders",
    icon: ShoppingBag,
  },
  {
    label: "Deliver",
    route: "/dashboard/artist/deliver",
    icon: Truck,
  },
  {
    label: "Messages",
    route: "/dashboard/artist/messages",
    icon: MessageCircle,
  },
  {
    label: "Earnings",
    route: "/dashboard/artist/earnings",
    icon: DollarSign,
  },
  {
    label: "Profile",
    route: "/dashboard/artist/profile",
    icon: User,
  },
  {
    label: "Tiers",
    route: "/dashboard/artist/tiers",
    icon: Layers,
  },
  {
    label: "Availability",
    route: "/dashboard/artist/availability",
    icon: Clock,
  },
  {
    label: "Streaming",
    route: "/dashboard/artist/streaming",
    icon: PlayCircle,
  },
  {
    label: "KYC & Payout",
    route: "/dashboard/artist/kyc",
    icon: IdCard,
  },
  {
    label: "Join as Featured",
    route: "/dashboard/artist/join-as-featured",
    icon: Heart,
  },
  {
    label: "Settings",
    route: "/dashboard/artist/settings",
    icon: Settings,
  },
];
