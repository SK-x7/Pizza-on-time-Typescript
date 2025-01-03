import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getMenuFromSupabase } from "../apis/apiRestaurant";
import SearchOrder from "../features/order/components/SearchOrder";
import Username from "../features/users/LogoutButton";
import { isUserAuthenticated } from "../features/users/userSlice";
import useAuth from "../hooks/useAuth";


export default function Header() {
  // const location=useLocation();
  // console.log(location.pathname);
  // const {isAuthenticated} = useAuth();
  // const [isLoggedIn,setIsLoggedIn] = useState<boolean>();
  // useEffect(()=>{
  //   if(isAuthenticated===true){
  //     setIsLoggedIn(true)
  //   }else{
  //     setIsLoggedIn(false)
  //   }
  // },[isAuthenticated,isLoggedIn])
  const isAuthenticated = useSelector(isUserAuthenticated);
  
  return (
    <>
    {
      // !isLoggedIn?<PublicHeader></PublicHeader>:<HeaderForAuthenticated></HeaderForAuthenticated>
      !isAuthenticated?<PublicHeader></PublicHeader>:<HeaderForAuthenticated></HeaderForAuthenticated>
    }
    </>
    )
}

function PublicHeader() {
  const location = useLocation();
  return <div className="bg-yellow-400 h-14 flex justify-between items-center px-6 py-3 w-full" onClick={()=>getMenuFromSupabase()}>
        <Link to="./">Pizza-On-Time Co.</Link>
        {/* <SearchOrder></SearchOrder> */}
        <div className="flex gap-4  px-3">
          <Link className="uppercase text-sm font-semibold " to={'/menu'}>Menu</Link>
          <span className="uppercase text-sm font-semibold">|</span>
          {location.pathname==="/login"?
          <Link className="uppercase text-sm font-semibold " to={'/signup'}>Sign Up</Link>:
          <Link className="uppercase text-sm font-semibold " to={'/login'}>Sign-in</Link>}
        </div>
      </div>
}
function HeaderForAuthenticated() {
  const location = useLocation();
  return <div className="bg-yellow-400 h-14 flex justify-between items-center px-6 py-3 w-full" onClick={()=>getMenuFromSupabase()}>
  <Link to="./">Pizza-On-Time Co.</Link>
  <SearchOrder></SearchOrder>
  <div className="flex gap-4  px-3">
    {
      (location.pathname!=="/me/orders"&&location.pathname!=="/")&&
      
  <Link className="uppercase text-sm font-semibold " to={'/me/orders'}>my orders</Link>
    }
    {
        (location.pathname==="/me/orders"||location.pathname==="/")&&
      
  <Link className="uppercase text-sm font-semibold " to={'/menu'}>Menu</Link>
    }
  <span className="uppercase text-sm font-semibold">|</span>
  {/* <span className="uppercase text-sm font-semibold">satyen</span> */}
  <Username></Username>
  </div>

</div>
}
