import DrawerComponent from '@/components/Drawer'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <DrawerComponent title="Curso">
      {children}
    </DrawerComponent>

  )
}
