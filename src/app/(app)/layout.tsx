"use client"
import { WebSocketProvider } from '@/contexts/WebsocketContext';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <WebSocketProvider>
      {children}
    </WebSocketProvider>
  )
}
