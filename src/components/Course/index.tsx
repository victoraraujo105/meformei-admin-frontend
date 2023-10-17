
'use client'
import useCourse from "@/hooks/useCourse";
import { Course as CourseType } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DialogConfirmation from "../Dialog/DialogConfirmation";
import Loading from "../Loading";
import DetailsCourse from "./DetailsCourse";
import EditCourse from "./EditCourse";

interface Props {
  courseId: string;
}

export default function Course({ courseId }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [editVisibility, setEditVisibility] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const { deleteCourse, readCourse, courses } = useCourse()
  const [course, setCourse] = useState<CourseType>()


  useEffect(() => {
    readCourse(courseId).then((course) => {
      if (!!course) {
        setCourse(course)
      } else {
        setIsLoading(false)
      }
      setIsLoading(false)
    })
  }, [courseId, courses])

  const router = useRouter()
  const pathname = usePathname()

  let pathNames = pathname.split('/').filter(path => path)

  const confirmDelete = async () => {
    setButtonLoading(true);
    try {
      await deleteCourse(courseId)
      setTimeout(() => {

        toast.success('Curso deletado com sucesso!');
        setOpenDialogConfirmation(false)

        pathNames.pop()
        router.push(`/${pathNames.join("/")}`)
        setButtonLoading(false)
      }, 1000);

    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
      setButtonLoading(false)
    }
  }

  if (isLoading) return <Loading />

  if (!!course) {
    if (!!editVisibility)
      return <EditCourse course={course} onSave={() => setEditVisibility(false)} />
    else {
      return (
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-[32rem]">

            <DetailsCourse course={course} />

            <div className="flex justify-between h-10 mt-12">
              <Button startIcon={<TableRowsIcon />} className="w-auto" variant="contained" onClick={() => router.push(`${pathname}/disciplinas`)}>Ver disciplinas</Button>
              <div className="flex w-auto gap-3 ">
                <Button onClick={() => setOpenDialogConfirmation(true)} startIcon={<DeleteIcon color="error" fontSize="inherit" />} fullWidth variant="outlined" color="error" > Deletar </Button>
                <Button onClick={() => setEditVisibility(true)} startIcon={<EditIcon />} fullWidth variant="contained" > Editar </Button>
              </div>
            </div>

          </div>
          <DialogConfirmation buttonDisabled={buttonLoading} content='Tem certeza de que deseja excluir este item?' open={openDialogConfirmation} onConfirm={() => confirmDelete()} handleClose={() => setOpenDialogConfirmation(false)} />
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[35%] gap-4 h-44">
      <Typography variant="body1" >...</Typography>
      <Button sx={{ minWidth: "20%", maxWidth: "30%" }} variant="outlined" onClick={() => { pathNames.pop(); router.push(`/${pathNames.join("/")}`) }}> Voltar </Button>
    </div>
  )

}