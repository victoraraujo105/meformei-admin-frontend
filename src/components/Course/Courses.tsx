import useCourse from "@/hooks/useCourse";
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button } from "@mui/material";
import { GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddCourse from "../Course/AddCourse";
import DataGrid from "../DataGrid";

export default function Courses() {
  const { courses } = useCourse()
  const [openDialogForm, setOpenDialogForm] = useState<boolean>(false)
  const router = useRouter()

  const handleRowViewClick = (id: GridRowId) => () => {
    router.push(`/cursos/${id}`)
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'courseName',
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


  useEffect(() => {
  }, [courses])


  return (
    <div>
      <DataGrid
        editMode="row"
        onRowEditStop={handleRowEditStop}
        rows={courses}
        columns={columns}
        key={"dg cursos na universidade"}
        toolbar={<Button variant="text" onClick={() => setOpenDialogForm(true)} startIcon={<AddIcon />} >Adicionar</Button>}
      />
      <AddCourse open={openDialogForm} onClose={() => setOpenDialogForm(false)} onConfirm={() => setOpenDialogForm(true)} />
    </div>
  )
}