
// import BasicTabs from '@/components/Tabs/index'
// import { PropertyComponentTabs } from '@/components/Tabs/tabs'
// import UniversityDetails from '@/components/University'
// import { University } from '@/types'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'


// async function getData(id: string) {
//   const cookieStore = cookies()
//   const token = cookieStore.get('token')
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/universities/${id}`, { headers: { 'Authorization': "Bearer " + token?.value } })

//   if (!res.ok) {
//     redirect("/universidades")
//   }
//   const data = await res.json()

//   return data
// }

// export default async function Page({
//   params: { course_id },
// }: {
//   params: { id: string }
// }) {
//   const data = await getData(id)
//   const tabs: PropertyComponentTabs[] = [
//     {
//       tabIndex: 0,
//       tabTitle: "Editar",
//       tabComponent: {} componente de detalhes do curso
//     },
//     {
//       tabIndex: 1,
//       tabTitle: "Cursos",
//       tabComponent: <h1>Cursos</h1>
//     },
//   ]
//   return (
//     <>
//       <BasicTabs key={"tabs"} tabs={tabs} />
//     </>

//   )
// }