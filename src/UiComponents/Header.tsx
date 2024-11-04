import { Link } from "react-router-dom";
import { getMenuFromSupabase } from "../apis/apiRestaurant";
import SearchOrder from "../features/order/components/SearchOrder";
import Username from "../features/users/Username";
import SearchBar from "./SearchBar";


export default function Header() {
  return (
    <div className="bg-yellow-400 h-14 flex justify-between items-center px-6 py-3" onClick={()=>getMenuFromSupabase()}>
        <Link to="./">Pizza-On-Time Co.</Link>
        {/* <SearchBar ></SearchBar> */}
        <SearchOrder></SearchOrder>
        <div className="flex gap-4  px-3">
          
        <Link className="uppercase text-sm font-semibold " to={'/me/orders'}>my orders</Link>
        <span className="uppercase text-sm font-semibold">|</span>
        <span className="uppercase text-sm font-semibold">satyen</span>
        </div>
        
        {/* <Username></Username> */}
    </div>
  )
}
