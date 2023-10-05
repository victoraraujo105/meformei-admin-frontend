"use client"
import { Course } from "@/types"
import { Typography } from "@mui/material"

interface Props {
  course: Course
}


export default function DetailsCourse({ course }: Props) {
  const { id, courseName, description, extraCurricularHours, optionalHours, requiredHours } = course

  const data = [{
    label: "Identificador",
    value: id
  }, {
    label: "Nome",
    value: courseName
  },
  {
    label: "Descrição",
    value: description
  },
  {
    label: "Qtd horas obrigatórias",
    value: requiredHours
  },
  {
    label: "Qtd horas complementares",
    value: extraCurricularHours
  },
  {
    label: "Qtd horas optativas",
    value: optionalHours
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