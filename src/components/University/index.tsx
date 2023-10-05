
'use client'

import useUniversity from "@/hooks/useUniversity"
import { University as UniversityType } from "@/types"
import { Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import DialogConfirmation from "../Dialog/DialogConfirmation"
import Loading from "../Loading"
import DetailsUniversity from "./DetailsUniversity"
import EditUniversity from "./EditUnivesity"

interface Props {
  universityId: string;
}

export default function University({ universityId }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [editVisibility, setEditVisibility] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const { deleteUniversity, readUniversity, universities } = useUniversity()
  const [university, setUniversity] = useState<UniversityType>()


  useEffect(() => {
    readUniversity(universityId).then((university) => {
      if (!!university) {
        setUniversity(university)
      } else {
        setIsLoading(false)
      }
      setIsLoading(false)
    })
  }, [universities])

  const router = useRouter()


  const confirmDelete = async () => {
    try {
      await deleteUniversity(universityId)
      setTimeout(() => {

        toast.success('Universidade deletada com sucesso!');
        setOpenDialogConfirmation(false)
        router.back()
      }, 1000);

    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
    }
  }

  if (isLoading) return <Loading />

  if (!!university) {
    if (!!editVisibility)
      return <EditUniversity university={university} onSave={() => setEditVisibility(false)} />
    else {
      return (
        <div>
          <div className="flex flex-col w-[32rem] mt-3">
            {<DetailsUniversity university={university} />}
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