
'use client'

import useDiscipline from "@/hooks/useDiscipline"
import { Discipline as DisciplineType } from "@/types"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from '@mui/icons-material/Edit'
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
  const [buttonLoading, setButtonLoading] = useState(false)
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
  }, [disciplineId, disciplines])

  const router = useRouter()

  const confirmDelete = async () => {
    setButtonLoading(true)
    try {
      await deleteDiscipline(disciplineId)
      setTimeout(() => {

        toast.success('Disciplina deletada com sucesso!');
        setOpenDialogConfirmation(false)
        router.back()
        setButtonLoading(false)
      }, 1000);

    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
      setButtonLoading(false)
    }
  }

  if (isLoading) return <Loading />

  if (!!discipline) {
    if (!!editVisibility)
      return <EditDiscipline discipline={discipline} onSave={() => setEditVisibility(false)} />
    else {
      return (
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-[32rem]">

            <DetailsDiscipline discipline={discipline} />

            <div className="flex justify-end h-10 mt-12">
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
      <Typography variant="body1" >Ocorreu um erro ao tentar carregar os dados</Typography>
      <Button sx={{ minWidth: "20%", maxWidth: "30%" }} variant="outlined" onClick={() => router.back()}> Voltar </Button>
    </div>
  )

}