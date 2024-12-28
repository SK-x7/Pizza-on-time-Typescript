import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function ProtectedLayout() {
  return (
    <div className='text-center  flex flex-col items-center !h-screen w-full'>
      <Header></Header>
      <div className='!bg-yellow-100/75 w-full mx-auto !flex justify-center items-center h-full'>
        
    <Outlet/>   
      </div>
    </div>
  )
}
