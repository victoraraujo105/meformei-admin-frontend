
import { UniversityContext } from "@/contexts/UniversityContext";
import { useContext } from "react";

export default function useUniversity() {
  return useContext(UniversityContext);
}
