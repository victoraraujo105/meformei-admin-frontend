
'use client'
import useUniversity from "@/hooks/useUniversity";
import { University as UniversityType } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Button, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DialogConfirmation from "../Dialog/DialogConfirmation";
import Loading from "../Loading";
import DetailsUniversity from "./DetailsUniversity";
import EditUniversity from "./EditUnivesity";
interface Props {
  universityId: string;
}

export default function University({ universityId }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [editVisibility, setEditVisibility] = useState(false)
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false)
  const { deleteUniversity, readUniversity, universities } = useUniversity()
  const [university, setUniversity] = useState<UniversityType | null>()


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
  const pathName = usePathname()

  let pathNames = pathName.split('/').filter(path => path)

  const confirmDelete = async () => {
    setButtonLoading(true);
    try {
      await deleteUniversity(universityId)
      setTimeout(() => {

        toast.success('Universidade deletada com sucesso!');
        setOpenDialogConfirmation(false)

        pathNames.pop()
        router.push(`/${pathNames.join("/")}`)
        setButtonLoading(false);
      }, 1000);

    } catch (error) {
      toast.error('Ocorreu um erro ao deletar.');
      setButtonLoading(false);
    }
  }

  if (isLoading) return <Loading />

  if (!!university) {
    if (!!editVisibility)
      return <EditUniversity university={university} onSave={() => setEditVisibility(false)} />
    else {
      return (
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-[32rem]">

            <DetailsUniversity university={university} />

            <div className="flex justify-between h-10 mt-12">
              <Button className="w-auto" variant="contained" startIcon={<TableRowsIcon />} onClick={() => router.push(`${pathName}/cursos`)}>Ver cursos</Button>
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