
'use client'

import { Course as CourseType } from "@/types"
import { Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import DialogConfirmation from "../Dialog/DialogConfirmation"
import Loading from "../Loading"

import useCourse from "@/hooks/useCourse"
import DetailsCourse from "./DetailsCourse"
import EditCourse from "./EditCourse"

interface Props {
  courseId: string;
}

export default function Course({ courseId }: Props) {
  const [isLoading, setIsLoading] = useState(true)
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
  }, [courses])

  const router = useRouter()


  const confirmDelete = async () => {
    try {
      await deleteCourse(courseId)
      setTimeout(() => {

        toast.success('Curso deletado com sucesso!');
        setOpenDialogConfirmation(false)
        router.back()
      }, 1000);

    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
    }
  }

  if (isLoading) return <Loading />

  if (!!course) {
    if (!!editVisibility)
      return <EditCourse course={course} onSave={() => setEditVisibility(false)} />
    else {
      return (
        <div>
          <div className="flex flex-col w-[32rem] mt-3">
            {<DetailsCourse course={course} />}
            <div className="flex justify-between mt-12 w-[90%]">
              <Button sx={{ minWidth: "20%", maxWidth: "30%" }} variant="outlined" onClick={() => setOpenDialogConfirmation(true)}> Deletar </Button>

              <Button sx={{ minWidth: "20%", maxWidth: "30%" }} variant="contained" onClick={() => setEditVisibility(true)}> Editar </Button>

            </div>
          </div>
          <DialogConfirmation content='Tem certeza de que deseja excluir este item?' open={openDialogConfirmation} onConfirm={() => confirmDelete()} handleClose={() => setOpenDialogConfirmation(false)} />
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col justify-center items-center w-[35%] gap-4 h-44">
      <Typography variant="body1" >Ocorreu um erro ao tentar carregar os dados</Typography>
      <Button sx={{ minWidth: "20%", maxWidth: "30%" }} variant="outlined" onClick={() => router.back()}> Voltar </Button>
    </div>
  )

}