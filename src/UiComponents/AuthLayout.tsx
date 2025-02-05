import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { supabase } from '../apis/apiRestaurant';
import useAuth from '../hooks/useAuth';
import Header from './Header';

export default function AuthLayout() {
  const {isAuthenticated} = useAuth();
  const navigate=useNavigate();
  useEffect(() => {
  if(isAuthenticated===true) return navigate("/menu");
  }, [isAuthenticated,navigate])
  // const navigate=useNavigate();
  // const {isAuthenticated} = useAuth();
  // if(isAuthenticated) navigate("/menu");
  // const dispatch=useDispatch();
  // const location = useLocation();
  // async function checkUserSession() {
  //   const session = localStorage.getItem('supabaseSession');
  //   const currentSession = session ? JSON.parse(session) : null;
    
  
  //   if (currentSession) {
  //     const { data: { session}, error } = await supabase.auth.setSession(currentSession);
  //     if (error) {
  //       console.error('Session restore error:', error.message);
  //       toast.error(error.message);
  //       localStorage.removeItem('supabaseSession');
  //       return navigate("/");
  //     } else if (session) {
  //       console.log('Session restored:', session);
  //       toast.success("Login successful!✔️");
  //       localStorage.setItem('supabaseSession',JSON.stringify(session));
  //       let { data:users, error } = await supabase
  // .from('users')
  // .select('*').eq("user_id",session.user.id);
  // console.log(users);
        
  //       const user:UserInterface=users&&users[0];
  //       if(user.username){
  //         dispatch(updateUser(user));
  //         localStorage.setItem("user_id",user.user_id);
  //       };
  //       return navigate("/menu");
  //       // window.location.href = '/menu'; // Redirect if valid
  //     }
  //   } else {
  //     localStorage.removeItem('supabaseSession');
  //   //   window.location.href = '/login'; // No session found, redirect to login
  //   }
  // }
  
  // useEffect(() => {
    
  //   // ANCHOR - 
  //   checkUserSession();
  // }, [location.pathname])
  return (
    <div className='text-center !min-h-screen !h-screen !max-h-screen flex flex-col items-center w-full' >
      <Header></Header>
      <div className='flex flex-1 w-full'>
        
      <div className='!bg-yellow-100/75 !flex justify-center items-start flex-1 w-full'>
    <Outlet/>
      </div>
        
      </div>
    </div>
  )
}
