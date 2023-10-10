"use client"
import API from '@/config/API';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

export const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: Props) => {

  const [user, setUser] = useState<UserAdmin | null>(null);
  const isAuthenticated = !!user;


  const connectUser = () => {
    const socket = new WebSocket('ws://localhost:3001')
    socket.onopen = () => {
      // A conexão foi estabelecida com sucesso
      console.log('Conexão WebSocket estabelecida.');
    };

    socket.onmessage = (event) => {
      // Recebeu uma mensagem do servidor WebSocket
      console.log('Mensagem recebida:', event.data);
    };

    socket.onclose = (event) => {
      // A conexão foi fechada
      console.log('Conexão WebSocket fechada.', event.code, event.reason);
    };

    socket.onerror = (error) => {
      // Ocorreu um erro na conexão WebSocket
      console.error('Erro na conexão WebSocket:', error);
    };

    socket.addEventListener('open', (event) => {
      console.log('Connected to WebSocket server');
      socket.send('Hello, server!');
    });

    socket.addEventListener('message', (event) => {
      console.log('Message from server:', event.data);
    });
  }

  useEffect(() => {

    const { token } = parseCookies()

    if (token) {
      AuthService.me().then((response: any) => {
        setUser(response)
      }).catch((error: any) => console.log(error))

    }
  }, [])

  async function signIn({ username, password }: SignInData) {
    const { data } = await AuthService.signIn({ username, password })

    const token = data?.token

    const userData: UserAdmin = data.user
    setCookie(undefined, 'token', token, { maxAge: 60 * 60 * 24 * 7 })  //7 dias

    API.defaults.headers['Authorization'] = `Bearer ${token}`;
    connectUser()
    setUser(userData)
    return { token: token, user: userData }
  }

  async function signOut() {

    destroyCookie(undefined, "token");

    API.defaults.headers['Authorization'] = `Bearer`;

    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

type SignInData = {
  username: string,
  password: string
}

export interface UserAdmin {
  id: string;
  name: string;
  email: string;
  lastname: string;
  adminId: string;
  username: string;
  city: string;
  state: string;
}

type ReturnData = {
  token: string;
  user: UserAdmin;
}

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<ReturnData>
  user: UserAdmin | null;
  signOut: () => Promise<void>
}


interface Props {
  children: React.ReactNode
}
