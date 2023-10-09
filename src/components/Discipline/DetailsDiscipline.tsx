"use client"
import { Discipline } from "@/types"
import { Typography } from "@mui/material"

interface Props {
  discipline: Discipline
}


export default function DetailsDiscipline({ discipline }: Props) {
  const { id, cod, name, menu, bibliography, description, workload, isOptional, prerequisites, semester } = discipline

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
    label: "Semestre",
    value: semester
  },
  {
    label: "Carga horaria",
    value: workload
  },
  {
    label: "Optativa",
    value: isOptional ? "Sim" : "Não"
  },
  {
    label: "Descrição",
    value: description
  },
  {
    label: "Ementa",
    value: menu
  },
  {
    label: "Bibliografia",
    value: bibliography
  },
  {
    label: "Prerequisitos",
    value: prerequisites.length > 0 ? prerequisites.map((cod) => cod) : "Nenhum"
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