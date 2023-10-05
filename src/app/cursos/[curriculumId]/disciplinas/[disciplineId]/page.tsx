
import Discipline from '@/components/Discipline'
import BasicTabs from '@/components/Tabs/index'
import { PropertyComponentTabs } from '@/components/Tabs/tabs'
import { DisciplineProvider } from '@/contexts/DisciplineContext'




interface PageProps {
  params: {
    curriculumId: string
    disciplineId: string
  }
}

export default async function Page({
  params: { curriculumId, disciplineId },
}: PageProps) {

  const tabs: PropertyComponentTabs[] = [
    {
      tabIndex: 0,
      tabTitle: "Informações",
      tabComponent: <DisciplineProvider courseId={curriculumId}> <Discipline disciplineId={disciplineId} /> </DisciplineProvider>
    },
  ]
  return (
    <>
      <BasicTabs key={"tabs"} tabs={tabs} />
    </>
  )
}