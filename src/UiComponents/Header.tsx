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
        {/* <span className="uppercase text-xs font-semibold">satyen</span> */}
        <Username></Username>
    </div>
  )
}
