"use client"
import { Button, TextField } from "@mui/material";
import DataGrid from "../DataGrid";
import { GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId } from "@mui/x-data-grid";
import { Course, Discipline } from "@/types";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from "next/navigation";
import { UniversityService } from "@/services/university.service";
import useDiscipline from "@/hooks/useDiscipline";
import Disciplines from "@/components/Discipline/Disciplines";
import { DisciplineInCourseProvider } from '@/contexts/DisciplineInCourseContext'

interface Props {
  course: Course
}

export default function DisciplinesInCourse({ course }: Props) {
  return (
    <DisciplineInCourseProvider course={course} >
      <Disciplines />
    </DisciplineInCourseProvider>
  )
}