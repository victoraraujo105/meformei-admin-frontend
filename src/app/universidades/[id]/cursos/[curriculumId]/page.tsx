
import Course from '@/components/Course'
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import { CourseProvider } from '@/contexts/CourseContext'

import { cookies } from 'next/headers'


async function getData(id: string) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/curriculums/${id}`, { headers: { 'Authorization': "Bearer " + token?.value } })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    // redirect("/universidades")
  }

}

interface PageProps {
  params: {
    curriculumId: string
  }
}


export default async function Page({
  params: { curriculumId },
}: PageProps) {

  const data = await getData(curriculumId)

  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Informações",
      tabComponent: <CourseProvider universityId={data.curriculum.university.id}> <Course courseId={curriculumId} /> </CourseProvider>
    },
  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>

  )
}