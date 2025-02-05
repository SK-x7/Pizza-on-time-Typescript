import { Outlet } from 'react-router-dom';
// import { supabase } from '../apis/apiRestaurant';
// import '../index.css';

export default function PublicLayout() {
  return (
    
        <div className='!bg-yellow-100/75 !w-full'>
        <Outlet/>
      </div>
    
    // <div className='text-center  flex flex-col items-center min-h-screen h-screen w-full' >
    //   <Header></Header>
    //   <div className='flex w-full flex-1 h-full'>
        
    //   <div className='!bg-yellow-100/75 flex flex-1 flex-col w-full mx-auto  justify-center items-center h-full overflow-y-scroll custom-scroll'>
    //     <Outlet/>
    //   </div>
    //   </div>
    //   <CartOverview/>
    // </div>
  )
}
