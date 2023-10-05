import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <CircularProgress />
    </div>
  )
}