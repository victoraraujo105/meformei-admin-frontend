"use client"
import DataGrid from "@/components/DataGrid";
import AddUniversity from "@/components/University/AddUniversity";
import useUniversity from "@/hooks/useUniversity";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId } from "@mui/x-data-grid";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ToastContainer } from 'react-toastify';

const rows: any[] = [];

export default function Page() {
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const { universities } = useUniversity()
  const router = useRouter()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      flex: 1,
    },
    {
      field: 'abv',
      headerName: 'Abreviação',
      width: 150,

    },
    {
      field: 'city',
      headerName: 'Cidade',
      width: 110,
      flex: 1,
    },
    {
      field: 'state',
      headerName: 'Estado',
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
        return [
          <GridActionsCellItem
            key={"view"}
            icon={<VisibilityIcon />}
            label="Detalhes"
            onClick={handleRowViewClick(row.id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowViewClick = (id: GridRowId) => () => {
    router.push(`universidades/${id}`)
  };

  return (
    <>
      <ToastContainer />
      <DataGrid
        editMode="row"
        onRowEditStop={handleRowEditStop}
        rows={universities ?? rows}
        columns={columns}
        key={"dg universidade"}
        toolbar={<Button variant="text" onClick={() => setOpenDialogForm(true)} startIcon={<AddIcon />} >Adicionar</Button>}
      />
      <AddUniversity open={openDialogForm} onClose={() => setOpenDialogForm(false)} onConfirm={() => setOpenDialogForm(true)} />
    </>
  )

}