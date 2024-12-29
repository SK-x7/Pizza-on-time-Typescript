// import { useSelector } from "react-redux";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

function Username() {
    const user =useSelector((state:RootState)=>state.user.user);
      if(user&&!user.username) return null;
      
    return <div className="hidden text-sm font-semibold md:block uppercase">{user?.username}</div>;
  }
  
  export default Username;
  
  