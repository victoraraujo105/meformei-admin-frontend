import { CourseContext } from "@/contexts/CourseContext";
import { useContext } from "react";

export default function useCourse() {
  return useContext(CourseContext);
}