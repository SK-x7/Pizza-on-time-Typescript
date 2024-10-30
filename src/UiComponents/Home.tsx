import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CreateNewUser from "../features/users/CreateNewUser";
import Login from "../features/users/LogIn";
import SignUp from "../features/users/SignUp";
import LoginUser from "../features/users/SignUp";
import { RootState } from "../store";
import Button from "./Button";

function Home() {
  const username=useSelector((state:RootState)=>state.user.username);
  return (
    <div className="my-10 mt-8 text-center sm:my-16 flex flex-col items-center">
      <h1 className="mb-8  text-stone-700 text-xl font-semibold" >
        The best pizza.
        <br />
        <span className="text-yellow-500">
          
        Straight out of the oven, straight to you.
        </span>
      </h1>
      {/* <CreateNewUser></CreateNewUser> */}
      
      <Outlet></Outlet>
      {/* <SignUp/> */}
      {/* <Login></Login> */}
            {/* //  <CreateNewUser></CreateNewUser>:<Button to='/menu' type='primary'>Continue ordering, {username}</Button> */}
            

      
    </div>
  );
}

export default Home;
