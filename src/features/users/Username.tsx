// import { useSelector } from "react-redux";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Username() {
    const username:string =useSelector((state:RootState)=>state.user.username);
      if(!username) return null;
      
    return <div className="hidden text-sm font-semibold md:block uppercase">{username}</div>;
  }
  
  export default Username;
  