import { TUserRole } from "./user.interface";

export type INotification = {
  _id: string;
  avatar?: string;
  title: string;
  description?: string;
  isReaded?: boolean;
  createdAt: string;
  updatedAt: string;
  audienceType?: TUserRole[];
};
