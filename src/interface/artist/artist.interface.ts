import { IGenre } from "../meta/meta.interface";

type ISocials = {
  spotify: string;
  instagram: string;
  website: string;
  tiktok: string;
  youtube: string;
  playlist?: string;
};

export type IArtist = {
  _id: string;
  displayName: string;
  bio: string;
  fullName: string;
  gender: "male" | "female";
  genre: IGenre[];
  designation: string;
  avgRating: number;
  reviews: number;
  isFavorite?: boolean;
  minStartingPrice: number;
  pricingTierCount: number;
  reviewCount: number;
  price: number;
  platforms: string[];
  coverPhoto: string;
  introVideo: string;
  introThumbnail: string;
  // oldPrice?: number;
  ordersCount?: number;
  eta: number;
  slotsLeft: number;
  avatar: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  socials: ISocials;
  language: string;
  timezone: string;
  country: string;
};

export type IUpdateArtistProfile = Partial<Omit<IArtist, "genre" | "language">> & {
  genre?: string[];
  language?: string;
};

export interface IRankedArtist extends IArtist {
  artistId: string;
}
