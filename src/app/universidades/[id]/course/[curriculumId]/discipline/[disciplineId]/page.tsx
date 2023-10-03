
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import  CourseDetails  from '@/components/Course/CourseDetails' 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DisciplineDetails from '@/components/Discipline/DisciplineDetails'
import PreRequisites from '@/components/Discipline/PreRequisites'


async function getData(id: string, curriculumId: string, disciplineId: string) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  console.log("token: ", token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/universities/${id}/courses/${curriculumId}/disciplines/${disciplineId}`, { headers: { 'Authorization': "Bearer " + token?.value } })
  
  if (!res.ok) {
    console.log("error:", res)
    redirect("/universidades")
  }
  const data = await res.json()
  console.log("curso:", data)

  return data
}

interface PageProps {
    params: {
        id: string
        curriculumId: string
        disciplineId: string
    }
}

export default async function Page({
  params: { id, curriculumId, disciplineId },
}: PageProps) {
  console.log("params: ", id, curriculumId, disciplineId)
  const data = await getData(id, curriculumId, disciplineId)
  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Editar",
      tabComponent: <DisciplineDetails discipline={data.discipline} />
    },
    {
      tabIndex: 1,
      tabTitle: "Pré-requisitos",
      tabComponent: <PreRequisites discipline={data.discipline} />
    },
  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>
  )
}