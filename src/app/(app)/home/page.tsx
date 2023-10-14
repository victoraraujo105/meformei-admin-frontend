"use client"
import { useWebSocket } from "@/contexts/WebsocketContext";
import { Divider, useTheme } from "@mui/material";

export default function Home() {
  const { userCount } = useWebSocket();
  const theme = useTheme()
  return (
    <div className="container mx-auto">

      <div className="flex flex-col gap-3 w-96">
        <div className="p-3 shadow-2xl w-3/4 h-auto border border-slate-400 rounded-sm">
          <p className="text-sm" color={theme.palette.primary.main}>Administradores conectados: </p>
          <p className="text-sm">{userCount.admins}</p>

          <Divider sx={{ my: 2 }} />

          <p className="text-sm " color={theme.palette.primary.main}>Estudantes conectados: </p>
          <p className="text-sm ">{userCount.students}</p>
        </div>

        {/* <div className="p-3 shadow-2xl w-3/4 h-auto border border-slate-400 rounded-sm">
          
        </div> */}
      </div>
    </div>
  )
}