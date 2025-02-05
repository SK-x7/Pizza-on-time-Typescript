import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import CreateNewUser from "../features/users/CreateNewUser";
import Login from "../features/users/LogIn";
import SignUp from "../features/users/SignUp";
import LoginUser from "../features/users/SignUp";
import { RootState } from "../store";
import Button from "./Button";
import Header from "./Header";

function Home() {
  const username=useSelector((state:RootState)=>state.user.username);
  return (
    <div className="flex flex-col max-h-screen h-screen min-h-screen" >
      <Header/>
    
    <div className=" flex-1 overflow-y-hidden text-center flex flex-col sm:flex-row items-center !h-full">
      {/* //  / */}
      <div className="flex flex-col h-full items-center min-[425px]:h-full  min-[425px]:justify-center min-[425px]:py-3    sm:h-full sm:w-1/2 gap-2 sm:gap-7  py-7 sm:items-center sm:pt-8 lg:justify-center  lg:gap-2  xl:gap-4 
      ">
      <div className="flex w-5/6 sm:w-5/6 flex-col gap-2 md:max-w-96 xl:!w-4/5 xl:max-w-full xl:-mt-5">
        
      <h1 className="mb-4  sm:mb-4 lg:mb-2 xl:mb-4  text-green-600 capitalize text-left text-5xl min-[425px]:text-6xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold sm:!w-full" >
        We Have the 
        <br />
        best pizza.
      </h1>
        
        <span className="text-green-700/90 font-bold text-2xl text-left mb-1 xl:text-3xl xl:w-2/3">
          
        Straight out of the oven, straight to you.
        </span>
        <span className="text-green-600 text-sm font-semibold text-left w-3/4 sm:w-2/3 mb-1 lg:text-base min-[375px]:text-base sm:text-sm">
          
        "Craving pizza? Pizza-On-Time Co. brings fresh, hot, and delicious pizzas right to your door. Customize your favorite flavors and enjoy fast delivery with just a few clicks. Your perfect slice is just an order away!"
        </span>
        <hr className="font-extrabold bg-green-600 h-[3px] w-2/3"/>
        </div>
        
        
        <div className="w-5/6 sm:w-5/6 sm:max-w-96 xl:w-4/5 xl:max-w-full">
          <Link to="/menu">
            <div className="flex ring-2 ring-green-700 max-w-48  gap-2 px-1 py-2 rounded-xl justify-center items-center">
              <div className=" h-7 w-max"><img className="object-cover h-full rotate-12" src="../../public/pizza-01.svg"/></div>
              <span className="text-lg font-semibold text-green-800 uppercase">Order now</span>
            </div>
          </Link>
        </div>
    </div>
      {/* <div className="w-full sm:w-1/2 lg:flex-1 h-0 min-[420px]:flex  min-[425px]:flex-1 sm:!h-full sm:flex-wrap hidden justify-end items-start"> */}
      <div className="w-full sm:w-1/2 lg:flex-1 h-0 sm:flex sm:!h-full sm:flex-wrap hidden justify-end items-start">
        
      <img className=" !object-contain h-1/2 md:h-full lg:object-contain" src="../../public/76745d89868413.5e04311b1b5f4-removebg-preview.png"/>
      <img className=" !object-contain h-1/2 md:hidden" src="../../public/76745d89868413.5e04311b1b5f4-removebg-preview.png"/>
      </div>
      </div>
      </div>
    );
}

export default Home;
