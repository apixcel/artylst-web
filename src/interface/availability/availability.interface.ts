export interface IAvailability {
  _id: string;
  artist: string;
  schedule: [
    {
      day: number;
      acceptOrders: boolean;
      startTime: string;
      endTime: string;
    },
  ];
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
}
