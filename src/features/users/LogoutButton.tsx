// import { useSelector } from "react-redux";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../apis/apiUsers";
import { RootState } from "../../store";
import { handleLoggedOutUser } from "./userSlice";

 function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async  function handleLogout() {
    const loggedOutSuccessfully =await logoutUser();
    if(loggedOutSuccessfully){
      dispatch(handleLoggedOutUser());
      navigate("/");
    }else{
      toast.error("Error logging you out, Please try again later.");
    }
  }
  
      
    return <button className="text-xs sm:text-sm font-semibold uppercase flex gap-1 justify-center items-center" onClick={(e)=>{e.preventDefault();handleLogout()}}>
      <span>
        
      Log out
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3 sm:size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>



    </button>;
  }
  
  export default LogoutButton;
  
  