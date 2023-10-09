import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import { AuthProvider } from '@/contexts/AuthContext'
import { CssBaseline } from '@mui/material'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
const poppins = Poppins({ subsets: ['latin'], weight: "600" })

export const metadata: Metadata = {
  title: 'MeFormei',
  description: 'MeFormei App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={poppins.className}>

        <ThemeRegistry>
          <CssBaseline />
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
