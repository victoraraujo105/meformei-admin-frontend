
'use client'

import useDiscipline from "@/hooks/useDiscipline"
import { Discipline as DisciplineType } from "@/types"
import { Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import DialogConfirmation from "../Dialog/DialogConfirmation"
import Loading from "../Loading"
import DetailsDiscipline from "./DetailsDiscipline"
import EditDiscipline from "./EditDiscipline"

interface Props {
  disciplineId: string;
}

export default function Discipline({ disciplineId }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [editVisibility, setEditVisibility] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const { disciplines, readDiscipline, deleteDiscipline } = useDiscipline()
  const [discipline, setDiscipline] = useState<DisciplineType>()


  useEffect(() => {
    readDiscipline(disciplineId).then((discipline) => {
      if (!!discipline) {
        setDiscipline(discipline)
      } else {
        setIsLoading(false)
      }
      setIsLoading(false)
    })
  }, [disciplines])

  const router = useRouter()


  const confirmDelete = async () => {
    try {
      await deleteDiscipline(disciplineId)
      setTimeout(() => {

        toast.success('Disciplina deletada com sucesso!');
        setOpenDialogConfirmation(false)
        router.back()
      }, 1000);

    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
    }
  }

  if (isLoading) return <Loading />

  if (!!discipline) {
    if (!!editVisibility)
      return <EditDiscipline discipline={discipline} onSave={() => setEditVisibility(false)} />
    else {
      return (
        <div>
          <div className="flex flex-col w-[32rem] mt-3">
            {<DetailsDiscipline discipline={discipline} />}
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