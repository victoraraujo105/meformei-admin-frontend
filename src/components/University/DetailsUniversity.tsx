"use client"
import { University } from "@/types"
import { Typography } from "@mui/material"

interface Props {
  university: University
}


export default function DetailsUniversity({ university }: Props) {
  const { id, name, abv, city, state } = university

  const data = [{
    label: "Identificador",
    value: id
  }, {
    label: "Nome",
    value: name
  },
  {
    label: "ABV",
    value: abv
  },
  {
    label: "Estado",
    value: state
  },
  {
    label: "Cidade",
    value: city
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