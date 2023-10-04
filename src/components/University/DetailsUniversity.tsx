import { University } from "@/types"
import { Typography } from "@mui/material"

interface Props {
  university: University
}


export default function DetailsUniversity({ university }: Props) {

  return (
    <div>
      {
        Object.entries(university).map(([key, value]) =>
          <>
            <Typography>
              {key}
            </Typography>
            <Typography>
              {value}
            </Typography>
          </>
        )

      }
    </div>
  )

}