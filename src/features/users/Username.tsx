// import { useSelector } from "react-redux";

function Username() {
    const username:string ='satyen'
    //   useSelector((state)=>state.user.username);
      if(!username) return null;
      
    return <div className="hidden text-sm font-semibold md:block uppercase">{username}</div>;
  }
  
  export default Username;
  