// import Button from '../../ui/Button'
import DeleteItem from "./DeleteItem"
import UpdateItemQuantity from "./updateItemQuantity";
import {useSelector} from "react-redux"
import { getCurrentCartQuantityById } from "../cartSlice";

export interface CartItemProps{
    // pizzaId:number;
    // name:string
    // quantity:number
    // totalPrice:number;
    item:object
}

export interface itemInCart{
    id?:number;
    pizzaId:number;
    name:string
    quantity:number
    unitPrice:number;
    totalPrice:number;
    ingredients:string[];
}


function CartItem({ item }:CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item as itemInCart;
  
  // const currentQuantity = useSelector(getCurrentCartQuantityById(pizzaId));
  const currentQuantity:number = useSelector(getCurrentCartQuantityById(pizzaId));
  // const isInCart=currentQuantity>0;
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between bg-gray-200/80 rounded-lg w-full">
      <p className="mb-2 text-left sm:mb-0 sm:text-lg">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-3">
        <p className="text-xs min-[375px]:text-sm font-bold sm:text-base">$ {(totalPrice)}</p>
        <div className=" flex gap-3">
          
        {/* <DeleteItem DeleteItem> */}
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}></UpdateItemQuantity>
        <DeleteItem pizzaId={pizzaId}></DeleteItem>
        </div>
        {/* <Button type="small">Delete</Button> */}
      </div>
    </li>
  );
}

export default CartItem;
