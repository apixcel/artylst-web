export type ServiceKey = "spotify" | "apple" | "ytmusic" | "soundcloud";

export type ServiceState = {
  status: "connected" | "not";
  primary?: boolean;
  externalUserId?: string;
};
