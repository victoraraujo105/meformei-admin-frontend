import { DisciplineContext } from "@/contexts/DisciplineContext";
import { useContext } from "react";

export default function useDiscipline() {
  return useContext(DisciplineContext);
}