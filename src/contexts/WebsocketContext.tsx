import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface WebSocketContextProps {
  userCount: { students: number, admins: number };
  socket: Socket | null
}

interface WebSocketProviderProps {
  userId: string | null;
  isAdmin: boolean | null;
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export function WebSocketProvider({ children, userId, isAdmin }: WebSocketProviderProps) {
  const [userCount, setUserCount] = useState({ students: 0, admins: 0 });
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (userId) {
      const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
        auth: { userId, isAdmin },
      });
      socketRef.current = socket;
      socket.connect();
    }

    if (socketRef.current) {
      socketRef.current.on('connectedUsers', (count: any) => {
        console.log(count)
        setUserCount(count);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  return (
    <WebSocketContext.Provider value={{ userCount, socket: socketRef?.current }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}