export interface ISession {
  _id: string;
  auth: string;
  userAgent: string;
  ip: string;
  revokedAt: null | string;
  expiresAt: string;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;

  isThisDevice: boolean;
}
