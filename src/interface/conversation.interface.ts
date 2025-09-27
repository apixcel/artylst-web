export interface IConversation {
  _id: string;
  orders: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  unreadCount: number;
  reciver: IConversationreciver;
  lastMessage: IConversationLastMessage;
}

export interface IConversationreciver {
  fullName: string;
  avatar: string;
  userName: string;
}

export interface IConversationLastMessage {
  _id: string;
  isMe: boolean;
  createdAt: string;
  text: string;
}

export interface IMessage {
  _id: string;
  conversation: string;
  sender: string;
  receiver: string;
  text: string;
  file?: string;
  metaText?: string;
  isReaded: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isMe: boolean;
  isSent?: boolean;
  isError?: boolean;
}
