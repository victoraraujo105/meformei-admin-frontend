
'use client'

import { University as UniversityType } from "@/types"
import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import UniversityDetails from "./DetailsUniversity"
import UniversityEdit from "./EditUnivesity"
import DialogConfirmation from "../Dialog/DialogConfirmation"
import useUniversity from "@/hooks/useUniversity"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

interface Props {
  universityId: string;
}

export default function University({ universityId }: Props) {
  const [editVisibility, setEditVisibility] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const {deleteUniversity, readUniversity} = useUniversity()
  const [ university, setUniversity ] = useState<UniversityType>()
  
  useEffect(()=>{
    readUniversity(universityId).then((university) => {
      if(!!university){
        setUniversity(university)
      }
    })
  }, [])

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


  if(!university){
    return(
      <div className="flex flex-col justify-center items-center w-[35%] gap-4">
      <Typography variant="body1" >Ocorreu um erro ao tentar carregar os dados</Typography>
      <Button sx={{minWidth: "20%", maxWidth:"30%"}} variant="outlined" onClick={() => router.push("universidades")}> Voltar </Button>
   
      </div>
    )
  }else{

    if (!!editVisibility ) {
      return <UniversityEdit university={university} onSave={() => setEditVisibility(false)} />
    }
  
    
    return (
      <>
        <div className="flex flex-col w-[50%]">
        <UniversityDetails university={university} />
        <div className="flex justify-between mt-12 w-[90%]">
        <Button sx={{minWidth: "20%", maxWidth:"30%"}} variant="outlined" onClick={() => console.log("deletar")}> Deletar </Button>
   
        <Button sx={{minWidth: "20%", maxWidth:"30%"}} variant="contained" onClick={() => setEditVisibility(true)}> Editar </Button>
  
        </div>
     </div>
      <DialogConfirmation content='Tem certeza de que deseja excluir este item?' open={openDialogConfirmation} onConfirm={() => confirmDelete()} handleClose={() => setOpenDialogConfirmation(false)} />
      </>
    
    )
  }


}