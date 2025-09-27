import { IArtist } from "./artist/artist.interface";
export type OrderStatusType =
  | "pending"
  | "accepted"
  | "rejected"
  | "in-revision"
  | "completed"
  | "disputed"
  | "delivered";
export interface IOrderStatus {
  status: OrderStatusType;
  createdAt?: string;
  note?: string;
}
export interface IOrder {
  _id: string;
  orderId: string;
  maxRevision: number;
  artist: string | IArtist;
  buyer: string;
  price: number;
  eta: string;
  platform: string;
  revision: number;
  status: [IOrderStatus];
  deliveryWindow?: string;
  deliveryInfo: IDeliveryInfo;
  addOn?: IAddOn;
  tierId: string;
  tier: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDeliverOrder {
  order: string;
  authVideo: string;
  playlistUrl: string;
}

export interface IDeliveryInfo {
  email: string;
  name: string;
}

export interface IAddOn {
  label: string;
  price: number;
}
