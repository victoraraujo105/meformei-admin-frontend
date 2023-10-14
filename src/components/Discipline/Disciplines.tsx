"use client"
import useDiscipline from "@/hooks/useDiscipline";
import { Discipline } from "@/types";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons } from "@mui/x-data-grid";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import DataGrid from "../DataGrid";
import AddDiscipline from './AddDiscipline';

export default function Disciplines() {

  const { disciplines } = useDiscipline()
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const router = useRouter()
  const pathName = usePathname()
  const handleRowViewClick = (discipline: Discipline) => () => {
    router.push(`${pathName}/${discipline.id}`)
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
      flex: 1,
    },
    {
      field: 'cod',
      headerName: 'Código',
      flex: 0.4,
    },
    {
      field: 'optional',
      headerName: 'Optativa',
      flex: 0.3,
      valueGetter: (params) => params.value ? "Sim" : "Não",
    },
    {
      field: 'workload',
      headerName: 'Carga Horária',
      flex: 0.2,
    },
    {
      field: 'semester',
      headerName: 'Período',
      flex: 0.2,
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
        key={"dg disciplinas no curso"}
        toolbar={<Button variant="text" onClick={() => setOpenDialogForm(true)} startIcon={<AddIcon />} >Adicionar</Button>}
      />
      <AddDiscipline open={openDialogForm} onClose={() => setOpenDialogForm(false)} onConfirm={() => setOpenDialogForm(false)} />
    </>
  )
}