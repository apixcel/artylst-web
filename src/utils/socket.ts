import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  // Ensure we only create it in the browser
  if (typeof window === "undefined") {
    throw new Error("getSocket() called on the server");
  }
  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true, // send cookies (your server expects accessToken cookie)
      // transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}
