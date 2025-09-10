import { IArtist } from "./artist/artist.interface";

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
  status: string;
  deliveryWindow?: string;
  deliveryInfo: IDeliveryInfo;
  addOn?: IAddOn;
  tierId: string;
  tier: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDeliveryInfo {
  email: string;
  name: string;
}

export interface IAddOn {
  label: string;
  price: number;
}
