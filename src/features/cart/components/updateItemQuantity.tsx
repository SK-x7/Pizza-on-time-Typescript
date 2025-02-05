import { useDispatch } from "react-redux"
import Button from "../../../UiComponents/Button"
import { ButtonProps } from "../cartInterface"
import { decreaseItemQuantity, increaseItemQuantity } from "../cartSlice";




function UpdateItemQuantity({pizzaId,currentQuantity}:ButtonProps) {
    const dispatch=useDispatch();
    return (
        <div className="flex gap-2 items-center md:gap-3">
            <button className="text-[10px] min-[375px]:text-xs py-1 px-2 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 sm:text-sm sm:py-2 xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</button>
            
        <span className="text-xs sm:text-sm font-medium">{currentQuantity}</span>
            <button className="text-[10px] min-[375px]:text-xs py-1 px-2 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 sm:text-sm sm:py-2 xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</button>
        </div>
    )
}

export default UpdateItemQuantity
