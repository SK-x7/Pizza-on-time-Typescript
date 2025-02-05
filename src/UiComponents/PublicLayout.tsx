import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import CartOverview from '../features/cart/components/CartOverview';
// import { supabase } from '../apis/apiRestaurant';
import { updateUser } from '../features/users/userSlice';
import useAuth from '../hooks/useAuth';
import Header from './Header'
import { UserInterface } from './ProtectedLayout';
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
