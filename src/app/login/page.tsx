"use client"

import FormLogin from '@/components/FormLogin';
import { Link as LinkMui, Typography } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import MeFormeiIcon from "../../assets/meformei-icon.svg";



export default function Page() {
  return (
    <main >
      <div className="Container flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500 ">
        <div className="Card flex flex-col items-center  w-[90%] max-w-[18rem] p-4 bg-[#ffffff]  h-auto rounded-lg drop-shadow-md hover:drop-shadow-xl ">

          <div className="Header flex flex-col items-center justify-center mb-7">
            <Image priority src={MeFormeiIcon} alt="MeFormei" width={60} />
            <Typography fontFamily={'inherit'} variant='h5'>Administrador</Typography>
          </div>

          <div className='mb-8 flex flex-col w-full h-full '>
            <FormLogin />

          </div>


          <div className='flex flex-row gap-4 mt-3'>

            <LinkMui
              component={Link}
              variant="body2"
              underline="none"
              href={"/recuperar-senha"}
            >
              Esqueci a senha
            </LinkMui>

          </div>
        </div>
      </div>
    </main>
  )
}
