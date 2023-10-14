import { redirect } from "next/navigation";
import 'server-only';


export const isAuthenticated = async (token?: string) => {
  if(!token) return false
  let res; 
  try {
    res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/session`, {headers: {"Authorization": `Bearer ${token}`}})
    const data = await res.json()
    return data
  } catch (error) {
    redirect('login')
  }
}