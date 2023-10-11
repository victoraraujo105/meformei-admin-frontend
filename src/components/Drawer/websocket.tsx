"use client"
import { useWebSocket } from '@/contexts/WebsocketContext';
import useAuth from '@/hooks/useAuth';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

type MessagePayload = {
  content: string;
  msg: string;
};

export const Teste = () => {
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<MessagePayload[]>([]);

  const [usersConnected, setUsersConnected] = useState(0)
  const { user } = useAuth()
  const { socket } = useWebSocket();
  useEffect(() => {
    if (socket == null) return () => null
    console.log("chega aq")
    socket.on('onMessage', (newMessage: MessagePayload) => {
      console.log('onMessage event received!');
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on('connectedUsers', (payload: any) => {
      console.log(payload)
      setUsersConnected(payload)
    });
    return () => {
      socket.off('onMessage');
    };
  }, [socket]);

  const onSubmit = () => {
    socket?.emit('newMessage', value);
    setValue('');
  };

  const client = () => {
    console.log(user)
  }

  return (
    <div>
      <div>
        <h1>{usersConnected}</h1>
        <Button onClick={client}>Teste</Button>
        <div>
          {messages.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};