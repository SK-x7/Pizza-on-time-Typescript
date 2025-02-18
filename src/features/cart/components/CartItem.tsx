// import Button from '../../ui/Button'
import { useSelector } from "react-redux";
import { getCurrentCartQuantityById } from "../cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./updateItemQuantity";

export interface CartItemProps {
	item: object;
}

export interface itemInCart {
	id?: number;
	pizzaId: number;
	name: string;
	quantity: number;
	unitPrice: number;
	totalPrice: number;
	ingredients: string[];
}

function CartItem({ item }: CartItemProps) {
	const { pizzaId, name, quantity, totalPrice } = item as itemInCart;

	const currentQuantity: number = useSelector(
		getCurrentCartQuantityById(pizzaId)
	);
	return (
		<li className="py-3 sm:flex sm:items-center sm:justify-between bg-gray-200/80 rounded-lg w-full">
			<p className="mb-2 text-left sm:mb-0 sm:text-lg">
				{quantity}&times; {name}
			</p>
			<div className="flex items-center justify-between sm:gap-3">
				<p className="text-xs min-[375px]:text-sm font-bold sm:text-base">
					$ {totalPrice}
				</p>
				<div className=" flex gap-3">
					<UpdateItemQuantity
						pizzaId={pizzaId}
						currentQuantity={currentQuantity}
					></UpdateItemQuantity>
					<DeleteItem pizzaId={pizzaId}></DeleteItem>
				</div>
			</div>
		</li>
	);
}

export default CartItem;
