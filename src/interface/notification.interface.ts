import { IUser } from "./user.interface";

export interface Notification {
  _id: string;
  user: IUser;
  title: string;
  description: string;
  read: boolean;
  notificationType: string;
  timeAgo: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}
