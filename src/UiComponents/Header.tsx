import { Link, useLocation } from "react-router-dom";
import { getMenuFromSupabase } from "../apis/apiRestaurant";
import SearchOrder from "../features/order/components/SearchOrder";


export default function Header() {
  const location=useLocation();
  console.log(location.pathname);
  return (
    <div className="bg-yellow-400 h-14 flex justify-between items-center px-6 py-3 w-full" onClick={()=>getMenuFromSupabase()}>
        <Link to="./">Pizza-On-Time Co.</Link>
        <SearchOrder></SearchOrder>
        <div className="flex gap-4  px-3">
          {
            (location.pathname==="/menu")&&
            
        <Link className="uppercase text-sm font-semibold " to={'/me/orders'}>my orders</Link>
          }
          {
            (location.pathname==="/me/orders"||location.pathname==="/"||location.pathname==="/signup")&&
            
        <Link className="uppercase text-sm font-semibold " to={'/menu'}>Menu</Link>
          }
        <span className="uppercase text-sm font-semibold">|</span>
        <span className="uppercase text-sm font-semibold">satyen</span>
        </div>
        
        {/* <Username></Username> */}
    </div>
  )
}
