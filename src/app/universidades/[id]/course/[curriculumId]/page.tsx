
import CourseDetails from '@/components/Course/CourseDetails'
import DisciplinesInCourse from '@/components/Discipline/DisciplinesInCourse'
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import { Course, Discipline } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getData(id: string, curriculumId: string): Promise<Course> {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  // provide course:
  
  console.log("token: ", token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/universities/${id}/courses/${curriculumId}`, { headers: { 'Authorization': "Bearer " + token?.value } })
  
  if (!res.ok) {
    console.log("error:", res)
    redirect("/universidades")
  }
  const data = await res.json()
  console.log("curso:", data)

  return data.course
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
  const course = await getData(id, curriculumId)
  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Editar",
      tabComponent: <CourseDetails course={course}/>
    },
    {
      tabIndex: 1,
      tabTitle: "Disciplinas",
      // we use a callback to get the disciplines from the api when tab is opened: 
      tabComponent: <DisciplinesInCourse course={course} />
    },
    
  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>
  )
}