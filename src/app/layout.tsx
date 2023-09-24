import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import { AuthProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { CssBaseline } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css';
const poppins = Poppins({ subsets: ['latin'], weight: "600" })

export const metadata: Metadata = {
  title: 'MeFormei',
  description: 'teste',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
