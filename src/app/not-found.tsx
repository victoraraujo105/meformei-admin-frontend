import Link from 'next/link'

export default async function NotFound() {

  return (
    <div className='flex flex-row h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500'>

      <div className='flex-col'>
        <h1 className='text-white text-9xl mr-12 text-center'>404</h1>

      </div>

      <div className='flex-col'>
        <h1 className='text-white text-6xl mb-8'>Oooops... :(</h1>
        <p className='text-slate-700'>Não foi possível encontrar o recurso solicitado </p>


        <p className='relative group text-white'>
          <Link href="/">Ir para pagina de login</Link>
          <span className="absolute -bottom-1 right-1/2 w-0 h-1 bg-white group-hover:w-1/2 group-hover:transition-all"></span>
        </p>
      </div>
    </div>
  )
}