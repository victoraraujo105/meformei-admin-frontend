"use client"

import { CourseProvider } from "@/contexts/CourseContext";
import Courses from "../Course/Courses";
interface Props {
  universityId: string;
}

export default function CoursesInUniversity({ universityId }: Props) {

  return (
    <CourseProvider universityId={universityId}>
      <Courses />
    </CourseProvider>
  )


}