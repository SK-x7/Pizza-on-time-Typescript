import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getMenuFromSupabase } from "../apis/apiRestaurant";
import SearchOrder from "../features/order/components/SearchOrder";
import Username from "../features/users/LogoutButton";
import { isUserAuthenticated } from "../features/users/userSlice";


export default function Header() {
  const isAuthenticated = useSelector(isUserAuthenticated);
  
  return (
    <>
    {
      
      !isAuthenticated?<PublicHeader></PublicHeader>:<HeaderForAuthenticated></HeaderForAuthenticated>
    }
    </>
    )
}

function PublicHeader() {
  const location = useLocation();
  return <div className="bg-yellow-400 h-12 !sm:h-14 sticky !top-0 z-50 flex justify-between items-center 
  px-2 sm:px-6 py-3 !w-full" onClick={()=>getMenuFromSupabase()}>
        <Link to="/" className="text-sm sm:text-base">Pizza-On-Time Co.</Link>
        <div className="flex gap-1 sm:gap-4  sm:px-3">
          <Link className="uppercase text-xs sm:text-sm font-semibold " to={'/menu'}>Menu</Link>
          <span className="uppercase text-xs sm:text-sm font-semibold">|</span>
          {location.pathname==="/login"?
          <Link className="uppercase text-xs sm:text-sm font-semibold " to={'/signup'}>Sign Up</Link>:
          <Link className="uppercase text-xs sm:text-sm font-semibold " to={'/login'}>Sign-in</Link>}
        </div>
      </div>
}
function HeaderForAuthenticated() {
  const location = useLocation();
  return <div className="bg-yellow-400 h-12 !sm:h-14 !sticky !top-0 z-50 flex justify-between items-center px-2 sm:px-6 py-3" onClick={()=>getMenuFromSupabase()}>
  <Link to="/" className="text-sm sm:text-base">Pizza-On-Time Co.</Link>
  <SearchOrder></SearchOrder>
  <div className="flex gap-1 sm:gap-4 px-1 sm:px-3 !text-xs sm:!text-sm">
    {
      (location.pathname!=="/me/orders"&&location.pathname!=="/")&&
      
  <Link className="uppercase text-xs sm:text-sm font-semibold " to={'/me/orders'}>my orders</Link>
    }
    {
        (location.pathname==="/me/orders"||location.pathname==="/")&&
      
  <Link className="uppercase text-xs sm:text-sm font-semibold " to={'/menu'}>Menu</Link>
    }
  <span className="uppercase text-xs sm:text-sm font-semibold">|</span>
  <Username></Username>
  </div>

</div>
}
