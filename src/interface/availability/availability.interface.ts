export interface IWeeklyAvailabilitySchedule {
  day: number;
  acceptOrders: boolean;
  startTime: string;
  endTime: string;
}
export interface IWeeklyAvailability {
  _id: string;
  artist: string;
  schedule: IWeeklyAvailabilitySchedule[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IUnavailableDates {
  _id: string;
  startTime: string;
  endTime: string;
  artist: string;
  createdAt: string;
  updatedAt: string;
  canBuyersContact?: boolean;
}

export interface IDeliveryWindow {
  _id: string;
  artist: string;
  hours: number[];
  maxQueue: number;
}

export interface IAutoOrderAccept {
  _id: string;
  artist: string;
  orderQueue?: number;
  autoOrderAccept: boolean;
  createdAt: string;
  updatedAt: string;
}
