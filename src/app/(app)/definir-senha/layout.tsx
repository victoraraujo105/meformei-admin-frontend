import NextBreadcrumb from '@/components/Breadcrumb'


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <NextBreadcrumb
        homeElement={'Login'}
        separator={"/"}
        containerClasses='flex pt-5'
        listClasses='text-white hover:underline mx-2 italic font-light  '
        capitalizeLinks
        rootPath='/login'
        activeClasses='hover:underline mx-2 italic font-light text-blue-900'
      />
      <div className='h-4/5 flex items-center justify-center'>
        {children}
      </div>
    </div>
  )
}
