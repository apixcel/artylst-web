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
    route: "/dashboard",
    icon: Home,
  },
  {
    label: "Orders",
    route: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    label: "Deliver",
    route: "/dashboard/deliver",
    icon: Truck,
  },
  {
    label: "Messages",
    route: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    label: "Earnings",
    route: "/dashboard/earnings",
    icon: DollarSign,
  },
  {
    label: "Profile",
    route: "/dashboard/profile",
    icon: User,
  },
  {
    label: "Tiers",
    route: "/dashboard/tiers",
    icon: Layers,
  },
  {
    label: "Availability",
    route: "/dashboard/availability",
    icon: Clock,
  },
  {
    label: "Streaming",
    route: "/dashboard/streaming",
    icon: PlayCircle,
  },
  {
    label: "KYC & Payout",
    route: "/dashboard/kyc",
    icon: IdCard,
  },
  {
    label: "Join as Featured",
    route: "/dashboard/join-as-featured",
    icon: Heart,
  },
  {
    label: "Settings",
    route: "/dashboard/settings",
    icon: Settings,
  },
];
