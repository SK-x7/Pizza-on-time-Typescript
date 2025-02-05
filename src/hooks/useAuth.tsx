import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { supabase } from "../apis/supabase";
import { useUiContext } from "../contexts/UiContexts";
// import { supabase } from "../apis/apiRestaurant";
import { handleUserAuthentication, updateUser } from "../features/users/userSlice";

export interface UserInterface {
  id: number;
  user_id: string;
  username?: string;
  created_at: string;
}

function useAuth(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {setUser_id} = useUiContext();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean|null>(null);

  async function checkUserSession() {
    const session = localStorage.getItem('supabaseSession');
    const currentSession = session ? JSON.parse(session) : null;
    
  
    if (currentSession) {
      const { data: { session}, error } = await supabase.auth.setSession(currentSession);
      if (error) {
        console.error('Session restore error:', error.message);
        toast.error(error.message);
        localStorage.removeItem('supabaseSession');
        localStorage.removeItem('user_id')
        setUser_id(null)
        setIsAuthenticated(false);
        // navigate("/");
      } else if (session) {
          setIsAuthenticated(true);
          dispatch(handleUserAuthentication());
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
          setUser_id(user.user_id);
        };
        // window.location.href = '/menu'; // Redirect if valid
      }
    } else {
      toast.error("NO session lol")
      localStorage.removeItem("user_id");
      localStorage.removeItem('supabaseSession');
      setUser_id(null)
      setIsAuthenticated(false);
    // return navigate("/");

    //   window.location.href = '/login'; // No session found, redirect to login
    }
  }

  useEffect(() => {
    checkUserSession();
  }, []);

  return { isAuthenticated };
};

export default useAuth;
