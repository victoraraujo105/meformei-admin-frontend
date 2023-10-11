"use client"
import API from '@/config/API';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

export const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: Props) => {

  const [user, setUser] = useState<UserAdmin | null>(null);
  const isAuthenticated = !!user;


  useEffect(() => {

    const { token } = parseCookies()

    if (token) {
      AuthService.me().then((response: any) => {
        setUser(response.data)
      }).catch((error: any) => console.log(error))

    }
  }, [])

  async function signIn({ username, password }: SignInData) {
    const { data } = await AuthService.signIn({ username, password })

    const token = data?.token

    const userData: UserAdmin = data.user
    setCookie(undefined, 'token', token, { maxAge: 60 * 60 * 24 * 7 })  //7 dias

    API.defaults.headers['Authorization'] = `Bearer ${token}`;

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
