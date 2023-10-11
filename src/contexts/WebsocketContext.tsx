

import useAuth from '@/hooks/useAuth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth()
  useEffect(() => {
    const newSocket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      auth: {
        userId: user?.id
      }
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export { WebSocketProvider };

