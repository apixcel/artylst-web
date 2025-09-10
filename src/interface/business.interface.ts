import { IGenre, IVibe } from "./meta/meta.interface";

export interface IBusinessProfile {
  _id: string;
  fullName: string;
  avatar?: string;
  businessName: string;
  email: string;
  genre: string | IGenre;
  vibe: string | IVibe;
  businessType: string;
  desirePlaylistLengthMinute: number;
  desirePriceUsd: number;
  useCase: string;
  createdAt: string;
  updatedAt: string;
}
