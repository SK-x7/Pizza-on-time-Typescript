import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './apis/apiRestaurant';
import CartOverview from './features/cart/components/CartOverview';
import { updateUser } from './features/users/userSlice';
import Header from './UiComponents/Header';


interface UserInterface {
  id: number;
  user_id: string;
  username?: string;
  created_at: string;
}

// Layout component that wraps the Header and renders child routes
function Layout() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const location = useLocation();
  async function checkUserSession() {
    const session = localStorage.getItem('supabaseSession');
    const currentSession = session ? JSON.parse(session) : null;
  
    if (currentSession) {
      const { data: { session}, error } = await supabase.auth.setSession(currentSession);
      if (error) {
        console.error('Session restore error:', error.message);
        toast.error(error.message);
        localStorage.removeItem('supabaseSession');
        return navigate("/");
      } else if (session) {
        console.log('Session restored:', session);
        toast.success("Login successful!✔️");
        localStorage.setItem('supabaseSession',JSON.stringify(session));
        let { data:users, error } = await supabase
  .from('users')
  .select('*').eq("user_id",session.user.id);
  console.log(users);
        
        const user:UserInterface=users&&users[0];
        if(user.username){
          dispatch(updateUser(user));
          localStorage.setItem("user_id",user.user_id);
        }
        console.log(window.location.href);
        if(window.location.href==='http://localhost:5173/'||window.location.href==="http://localhost:5173/signup")  return navigate("/");
        return;
        // window.location.href = '/menu'; // Redirect if valid
      }
    } else {
      localStorage.removeItem('supabaseSession');
      console.log(window.location.href,window.location.href)
      if(location.pathname === '/login'||location.pathname === '/signup'||location.pathname==="/") return null;
      return navigate("/");
      window.location.href = '/login'; // No session found, redirect to login
    }
  }
  
  useEffect(() => {
    
    // ANCHOR - 
    checkUserSession();
  }, [location.pathname])

  return (
    <Outlet /> 
    );
    {/* This is where child routes (like Home or Menu) will be rendered */}
    // <div className='h-screen grid grid-rows-[auto_1fr_auto] '>
      {/* <Header /> */}
      {/* //FIXME -  */}
      //  <div className='overflow-scroll'>
        
      {/* <main className='max-w-screen-lg mx-auto'> */}
      // <main className='w-full mx-auto'>
        {/* //NOTE - change this later */}
      {/* <main className='max-w-screen-lg mx-auto !flex justify-center items-center !bg-red-400'> */}
      // </main>
      //  </div>
      //  <CartOverview></CartOverview>
    // </div>
}

export default Layout;
