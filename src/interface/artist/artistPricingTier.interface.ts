export type TierKey = "mini" | "standard" | "pro";
export type TierName = "Mini" | "Standard" | "Pro";

export interface IArtistPricingTier {
  artist: string;
  name: TierName;
  songs: number;
  priceUsd: number;
  deliveryTime: string;
  description: string[];
  revisionCount: number;
  order: number;
  _id: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type ITierDefaults = {
  id?: string;
  songs: number;
  price: number;
  deliveryTime: string;
  revisionCount: 1 | 2 | 3;
};
