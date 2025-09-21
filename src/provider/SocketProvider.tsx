"use client";

import { getSocket } from "@/utils/socket";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Socket } from "socket.io-client";

type SocketContextValue = {
  socket: Socket | null;
  connected: boolean;
};

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  connected: false,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  // Create once in the browser
  if (typeof window !== "undefined" && !socketRef.current) {
    socketRef.current = getSocket();
  }

  useEffect(() => {
    const s = socketRef.current!;
    // Attach listeners once
    function onConnect() {
      setConnected(true);
    }
    function onDisconnect() {
      setConnected(false);
    }

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);

    // Connect (cookies sent because withCredentials: true)
    if (!s.connected) s.connect();

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      // Optional: keep socket alive across page transitions.
      // If you want to fully close when provider unmounts, uncomment:
      // s.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ socket: socketRef.current, connected }), [connected]);

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}
