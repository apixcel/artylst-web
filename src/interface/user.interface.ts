export type TGender = "male" | "female";

export interface IUser {
  _id: string;
  email: string;
  role: "artist" | "business" | "admin" | "fan";
  fullName: string;
  gender: TGender;
  avatar?: string;
  displayName: string;
  userName: string;
  dob: string;
  auth: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  password: string;
  genre: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface RegisterArtistPayload {
  email: string;
  fullName: string;
  gender: TGender;
  displayName: string;
  userName: string;
  dob: string;
  password: string;
  // phoneNumber?: string; // include if backend accepts it
  isEmailVerified: boolean;
}

export interface RegisterBusinessPayload {
  fullName: string;
  businessName: string;
  email: string;
  genre: string;
  vibe: string;
  businessType: string;
  desirePlaylistLengthMinute: number;
  desirePriceUsd: number;
  useCase: string;
  password: string;
}
