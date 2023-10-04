
'use client'

import { University } from "@/types"
import { Button } from "@mui/material"
import { useState } from "react"
import UniversityDetails from "./DetailsUniversity"
import UniversityEdit from "./EditUnivesity"

interface Props {
  university: University
}

export default function University({ university }: Props) {
  const [editVisibility, setEditVisibility] = useState(false)

  if (!!editVisibility) {
    return <UniversityEdit university={university} onSave={() => setEditVisibility(false)} />
  }

  return (
    <div>
      <UniversityDetails university={university} />
      <Button variant="contained" onClick={() => setEditVisibility(true)}> Editar </Button>
    </div>
  )
}