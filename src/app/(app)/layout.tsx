"use client"
import { WebSocketProvider } from '@/contexts/WebsocketContext';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const existingUser = localStorage.getItem('user')
    if (existingUser) {
      setUser(JSON.parse(existingUser).id)
    }
  }, [])

  return (
    <WebSocketProvider userId={user} isAdmin={true}>
      <ToastContainer />
      {children}
    </WebSocketProvider>
  )
}
