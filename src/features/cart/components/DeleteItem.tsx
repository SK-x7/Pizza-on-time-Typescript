import { useDispatch } from "react-redux";
import Button from "../../../UiComponents/Button";
import {deleteItem} from "../cartSlice"

interface DeleteItemProps{
    pizzaId:number;
}

function DeleteItem({pizzaId}:DeleteItemProps) {
    const dispatch=useDispatch();
    
    return (
        <button className="text-[10px] min-[375px]:text-xs py-1 px-2 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 sm:text-sm sm:py-2  xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed" onClick={()=>dispatch(deleteItem(pizzaId))}>Delete</button>);
}

export default DeleteItem


