import { IGenre } from "../meta/meta.interface";

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
  minStartingPrice: number;
  pricingTierCount: number;
  reviewCount: number;
  price: number;
  platforms: string[];
  coverPhoto: string;
  country: string;
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
};

export interface IRankedArtist extends IArtist {
  artistId: string;
}
