"use client"
import { Button } from "@mui/material";
import DataGrid from "../DataGrid";
import { GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId } from "@mui/x-data-grid";
import { Curriculum } from "@/types";
import { useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from "next/navigation";
import { UniversityService } from "@/services/univesity.service";

interface Props {
  universityId: string;
}

export default function CoursesInUniversity({ universityId }: Props) {
  const [data, setData] = useState<Curriculum[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const router = useRouter()

  const handleRowViewClick = (id: GridRowId) => () => {
    router.push(`universidades/${universityId}/course/${id}`)
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
      field: 'requiredHours',
      headerName: 'Qtd de horas obrig.',
      width: 110,
      flex: 1,
    },
    {
      field: 'optionalHours',
      headerName: 'Qtd de horas opcional',
      width: 110,
      flex: 1,
    },
    {
      field: 'extraCurricularHours',
      headerName: 'Qtd de horas extras',
      width: 110,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={"view"}
            icon={<VisibilityIcon />}
            label="Detalhes"
            onClick={handleRowViewClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  useEffect(() => {
    UniversityService.getCoursesInUniversity(universityId).then((response) => setData(response.data.courses));
  }, [])

  return (
    <>
      <DataGrid
        editMode="row"
        onRowEditStop={handleRowEditStop}
        rows={data ?? []}
        columns={columns}
        key={"dg cursos na universidade"} />
      <Button sx={{ mt: 1 }} variant="contained" fullWidth onClick={() => setOpenDialogForm(true)}>Adicionar</Button>
    </>
  )
}