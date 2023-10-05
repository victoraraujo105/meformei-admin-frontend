"use client"
import Disciplines from "@/components/Discipline/Disciplines";
import { DisciplineProvider } from "@/contexts/DisciplineContext";

interface Props {
  courseId: string
}

export default function DisciplinesInCourse({ courseId }: Props) {
  return (
    <DisciplineProvider courseId={courseId} >
      <Disciplines />
    </DisciplineProvider>
  )
}