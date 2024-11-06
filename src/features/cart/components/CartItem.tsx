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
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">$ {(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity}></UpdateItemQuantity>
        <DeleteItem pizzaId={pizzaId}></DeleteItem>
        {/* <DeleteItem DeleteItem> */}
        {/* <Button type="small">Delete</Button> */}
      </div>
    </li>
  );
}

export default CartItem;
