import { isAuthenticated } from '@/lib/auth'

import { NextRequest, NextResponse } from 'next/server'

 
// // Limit the middleware to paths starting with `/api/`
// export const config = {
//   matcher: '/',
// }
 
export async function middleware(request: NextRequest) {
  let cookie = request.cookies.get('token')
  let isAuth = await isAuthenticated(cookie?.value)
  
  if(request.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/login', request.url) )

  if(request.nextUrl.pathname.startsWith('/login')){
    if (isAuth) {
      return NextResponse.redirect(new URL('/home', request.url)) 
    }
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/home' || '/universidades')) {

    if (!isAuth) {
      return NextResponse.redirect(new URL('/nao-autorizado', request.url))
    }else{
      return NextResponse.next()
    }
  }

}