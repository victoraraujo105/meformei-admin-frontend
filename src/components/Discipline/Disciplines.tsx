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

export default function Disciplines() {
  // access context:

  const { disciplines } = useDiscipline()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const router = useRouter()
  console.log("Disciplines: ", disciplines)

  const handleRowViewClick = (discipline: Discipline) => () => {
    router.push(`/universidades/${discipline.course.university.id}/course/${discipline.course.id}/discipline/${discipline.id}`)
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      flex: 1,
    },
    {
      field: 'cod',
      headerName: 'Código',
      width: 110,
      flex: 1,
    },
    {
      field: 'menu',
      headerName: 'Ementa',
      width: 110,
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      width: 110,
      flex: 1,
    },
    {
      field: 'isOptional',
      headerName: 'Optativa',
      width: 110,
      flex: 1,
      valueGetter: (params) => params.value ? "Sim" : "Não",
    },
    {
      field: 'workload',
      headerName: 'Carga Horária',
      width: 110,
      flex: 1,
    },
    {
      field: 'semester',
      headerName: 'Período',
      width: 110,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        const discipline = disciplines.find(discipline => discipline.id === row.id);
        return [
          <GridActionsCellItem
            key={"view"}
            icon={<VisibilityIcon />}
            label="Detalhes"
            onClick={() => {
              if (discipline) {
                handleRowViewClick(discipline)();
              }
            }}
            color="inherit"
          />,
        ];
      },
    }
  ];

  return (
    <>
      <DataGrid
        editMode="row"
        onRowEditStop={handleRowEditStop}
        rows={disciplines ?? []}
        columns={columns}
        key={"dg disciplinas no curso"} />
      <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={() => setOpenDialogForm(true)}>Adicionar</Button>
    </>
  )
}