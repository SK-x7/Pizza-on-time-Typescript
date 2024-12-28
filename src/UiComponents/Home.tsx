import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import CreateNewUser from "../features/users/CreateNewUser";
import Login from "../features/users/LogIn";
import SignUp from "../features/users/SignUp";
import LoginUser from "../features/users/SignUp";
import { RootState } from "../store";
import Button from "./Button";

function Home() {
  const username=useSelector((state:RootState)=>state.user.username);
  return (
    <div className=" text-center flex items-center !h-full my-2 bg-yellow-100/75">
      <div className="flex flex-col gap-7 pl-28">
      <div className="flex w-2/3 flex-col gap-2 ">
        
      <h1 className="mb-4  text-green-600 capitalize text-left text-6xl font-extrabold" >
        We Have the 
        <br />
        best pizza.
      </h1>
        
        <span className="text-green-700/90 font-bold text-2xl text-left mb-1">
          
        Straight out of the oven, straight to you.
        </span>
        <span className="text-green-600 text-sm font-semibold text-left w-1/2 mb-1">
          
        "Craving pizza? [Your Website Name] brings fresh, hot, and delicious pizzas right to your door. Customize your favorite flavors and enjoy fast delivery with just a few clicks. Your perfect slice is just an order away!"
        </span>
        <hr className="font-extrabold bg-green-600 h-[3px] w-1/2 "/>
        </div>
        
        
        <div>
          <Link to="/menu">
            <div className="flex ring-2 ring-green-700 max-w-48  gap-2 px-1 py-2 rounded-xl justify-center items-center">
              <div className=" h-7 w-max"><img className="object-cover h-full rotate-12" src="../../public/pizza-01.svg"/></div>
              <span className="text-lg font-semibold text-green-800 uppercase">Order now</span>
            </div>
          </Link>
        </div>
    </div>
      <div className="w-full h-full flex justify-end">
        
      <img src="../../public/76745d89868413.5e04311b1b5f4-removebg-preview.png"/>
      </div>
      </div>
      
            

      

  );
}

export default Home;
