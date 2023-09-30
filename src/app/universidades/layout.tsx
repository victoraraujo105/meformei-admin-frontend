import DrawerComponent from '@/components/Drawer'
import { UniversityProvider } from '@/contexts/UniversityContext'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <DrawerComponent title='Universidades'>
      <UniversityProvider>
        {children}
      </UniversityProvider>
    </DrawerComponent>

  )
}
