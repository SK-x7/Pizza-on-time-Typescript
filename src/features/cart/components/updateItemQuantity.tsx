import { useDispatch } from "react-redux"
import Button from "../../../UiComponents/Button"
import { ButtonProps } from "../cartInterface"
import { decreaseItemQuantity, increaseItemQuantity } from "../cartSlice";




function UpdateItemQuantity({pizzaId,currentQuantity}:ButtonProps) {
    const dispatch=useDispatch();
    return (
        <div className="flex gap-2 items-center md:gap-3">
            <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>--</Button>
            
        <span className="text-sm font-medium">{currentQuantity}</span>
            <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>++</Button>
        </div>
    )
}

export default UpdateItemQuantity
