
import DisciplinesInCourse from '@/components/Discipline/DisciplinesInCourse'


interface PageProps {
  params: {
    curriculumId: string
  }
}


export default async function Page({
  params: { curriculumId },
}: PageProps) {

  return (
    <DisciplinesInCourse courseId={curriculumId} />
  )
}