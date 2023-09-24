import DrawerComponent from '@/components/Drawer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <DrawerComponent title="Painel principal">
        {children}
      </DrawerComponent>

  )
}
