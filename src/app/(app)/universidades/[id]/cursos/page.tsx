
import CoursesInUniversity from '@/components/University/CoursesInUniversity'


interface PageProps {
  params: {
    id: string
  }
}


export default async function Page({
  params: { id },
}: PageProps) {

  return (
    <CoursesInUniversity universityId={id} />
  )
}