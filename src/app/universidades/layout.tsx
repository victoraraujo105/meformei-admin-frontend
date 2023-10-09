import NextBreadcrumb from '@/components/Breadcrumb'
import DrawerComponent from '@/components/Drawer'
import { UniversityProvider } from '@/contexts/UniversityContext'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <DrawerComponent title='Universidades'>
      <NextBreadcrumb
        homeElement={'Painel'}
        separator={"/"}
        activeClasses='text-blue-500'
        containerClasses='flex '
        listClasses='hover:underline mx-2 italic font-light '
        capitalizeLinks
      />
      <UniversityProvider>
        {children}
      </UniversityProvider>
    </DrawerComponent>

  )
}
