
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import University from '@/components/University'
import CoursesInUniversity from '@/components/University/CoursesInUniversity'


// async function getData(id: string) {
//   const cookieStore = cookies()
//   const token = cookieStore.get('token')
//   try {
//     await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/universities/${id}`, { headers: { 'Authorization': "Bearer " + token?.value } })

//   } catch (error) {
//     console.log(error)
//   }

//   // const res = 
//   // if (!res.ok) {
//   //   redirect("/universidades")
//   // }
//   // const data = await res.json()

//   // return data
// }

interface PageProps {
  params: {
    id: string
  }
}


export default async function Page({
  params: { id },
}: PageProps) {

  // const data = await getData(id)
  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Editar",
      tabComponent: <University universityId={id} />
    },
    {
      tabIndex: 1,
      tabTitle: "Cursos",
      tabComponent: <CoursesInUniversity universityId={id} />
    },
  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>

  )
}