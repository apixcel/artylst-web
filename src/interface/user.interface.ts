export type TGender = "male" | "female";
export type TUserRole = "artist" | "business" | "fan";

export interface IUser {
  _id: string;
  email: string;
  role: TUserRole;
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
