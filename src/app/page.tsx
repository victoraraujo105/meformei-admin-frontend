"use client"

import FormLogin from '@/components/FormLogin';
import { Link, Typography } from "@mui/material";
import Image from 'next/image';
import MeFormeiIcon from "../assets/meformei-icon.svg";



export default function App() {
 
  
  return (
    <main >
      <div className="Container flex justify-center items-center h-screen bg-gradient-to-r from-cyan-500 to-blue-500 ">
        <div className="Card flex flex-col items-center  w-[90%] max-w-[18rem] p-4 bg-[#ffffff]  h-auto rounded-lg drop-shadow-md hover:drop-shadow-xl ">
          
          <div className="Header flex flex-col items-center justify-center mb-7">
            <Image priority src={MeFormeiIcon} alt="MeFormei" width={60}/>
            <Typography fontFamily={'inherit'} variant='h5'>Administrador</Typography>
          </div>
          
          <div className='mb-8 flex flex-col w-full h-full '>
            <FormLogin/>
              
          </div>
            
  
          <div className='flex flex-row gap-4 mt-3'>
            <Link
              component="button"
              variant="body2"
              underline="none"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Entrar com email
            </Link>
            <Link
              component="button"
              variant="body2"
              underline="none"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Esqueci a senha
            </Link>    
              
          </div>        
        </div>
      </div>
    </main>
  )
}
