"use client"
import { Discipline } from "@/types"
import { Typography } from "@mui/material"

interface Props {
  discipline: Discipline
}


export default function DetailsDiscipline({ discipline }: Props) {
  const { id, cod, name, courseOutline, bibliography, description, hours, optional, prerequisiteDisciplines, semester } = discipline

  const data = [{
    label: "Identificador",
    value: id
  }, {
    label: "Nome",
    value: name
  },
  {
    label: "Código",
    value: cod
  },
  {
    label: "Ementa",
    value: courseOutline
  },
  {
    label: "Bibliografia",
    value: bibliography
  },
  {
    label: "Descrição",
    value: description
  },
  {
    label: "Carga horaria",
    value: hours
  },
  {
    label: "Optativa",
    value: optional ? "Sim" : "Não"
  },
  {
    label: "Semestre",
    value: semester
  },
  {
    label: "Prerequisitos",
    value: prerequisiteDisciplines
  },
  ]
  const variantTitle = "body1"
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map(({ label, value }) => (
        <div key={label + value}>
          <Typography variant={variantTitle} fontWeight={"600"}>
            {label}
          </Typography>
          <Typography variant="subtitle1">
            {value}
          </Typography>
        </div>
      ))}
    </div>
  )

}