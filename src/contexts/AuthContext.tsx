"use client"
import API from '@/config/API';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

export const AuthContext = createContext({} as AuthContextType);
export const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserAdmin | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter()

  useEffect(() => {

    const { token } = parseCookies()

    if (token) {
      AuthService.me().then((response: any) => {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      }).catch((error: any) => { localStorage.removeItem('user'); })
    }

    setLoading(false)
  }, [])

  async function signIn({ username, password }: SignInData) {

    const { data } = await AuthService.signIn({ username, password })

    const token = data?.token

    const userData: UserAdmin = data.user
    if (!data.isAdmin) return Promise.reject()
    setCookie(undefined, 'token', token, { maxAge: 60 * 60 * 24 * 7 })  //7 dias

    API.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { token: token, user: userData }
  }

  async function signOut() {
    localStorage.removeItem('user')
    destroyCookie(undefined, "token");

    API.defaults.headers['Authorization'] = `Bearer`;

    setUser(null)
    router.push('/')
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, user, loading }}>
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
  adminId: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  state: string;
  city: string;
  recoverToken: string;
  salt: string;
  inative: Date | null
  avatar: string
  createdAt: Date
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
  loading: boolean
}


interface Props {
  children: React.ReactNode
}
