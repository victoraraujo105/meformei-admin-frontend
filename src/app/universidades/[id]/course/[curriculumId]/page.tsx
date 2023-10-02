
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import  CourseDetails  from '@/components/Course/CourseDetails' 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'


async function getData(id: string, curriculumId: string) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  console.log("token: ", token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/universities/${id}/courses/${curriculumId}/disciplines`, { headers: { 'Authorization': "Bearer " + token?.value } })

  if (!res.ok) {
    console.log("error:", res)
    redirect("/universidades")
  }
  const data = await res.json()

  return data
}

interface PageProps {
    params: {
        id: string
        curriculumId: string
    }
}

export default async function Page({
  params: { id, curriculumId },
}: PageProps) {
  console.log("params: ", id, curriculumId)
  const data = await getData(id, curriculumId)
  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Editar",
      tabComponent: <CourseDetails course={data?.course}/>
    },
    {
      tabIndex: 1,
      tabTitle: "Disciplinas",
      tabComponent: <h1>Disciplinas</h1>
    },
  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>
  )
}