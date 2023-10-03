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
import { PreRequisiteProvider } from "@/contexts/PreRequesiteContext";

interface Props {
  discipline: Discipline
}

export default function PreRequisites({ discipline }: Props) {
  return (
    <PreRequisiteProvider discipline={discipline}>
      <Disciplines />
    </PreRequisiteProvider>
  )
}