import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentCartQuantityById } from "../../cart/cartSlice";
import DeleteItem from "../../cart/components/DeleteItem";
import UpdateItemQuantity from "../../cart/components/updateItemQuantity";
import { isUserAuthenticated } from "../../users/userSlice";
import { MenuItem } from "../menuInterfaces";

export interface MenuItemsProps {
	pizza: MenuItem;
	onCustomizeClick: (pizza: MenuItem) => void;
}

function MenuItems({ pizza, onCustomizeClick }: MenuItemsProps) {
	const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

	const currentQuantity = useSelector(getCurrentCartQuantityById(id));
	const isInCart = currentQuantity > 0;

	const isLoggedIn = useSelector(isUserAuthenticated);

	return (
		<li className="flex gap-2 sm:gap-4 py-2 items-center">
			<img
				src={imageUrl}
				alt={name}
				className={`h-16 sm:h-24 object-cover${soldOut ? "opacity-70 grayscale" : ""}`}
			/>
			<div className="flex grow flex-col pt-1  sm:pt-0.5">
				<p className="font-medium text-left text-sm sm:text-base">{name}</p>
				<p className="text-xs sm:text-sm text-left capitalize italic text-stone-500 mb-1 sm:mb-2">
					{ingredients.join(", ")}
				</p>
				<div className=" flex flex-col justify-center items-start gap-2 sm:gap-0 min-[425px]:flex-row sm:items-center sm:justify-between">
					{!soldOut ? (
						<p className="text-xs sm:text-sm">{unitPrice}</p>
					) : (
						<p className="text-xs sm:text-sm font-medium uppercase text-stone-500">
							Sold out
						</p>
					)}

					<div className="w-full flex justify-start min-[425px]:justify-end">
						{isLoggedIn === true ? (
							<AddToCartButton
								currentQuantity={currentQuantity}
								isInCart={isInCart}
								onCustomizeClick={onCustomizeClick}
								pizza={pizza}
								soldOut={soldOut}
							></AddToCartButton>
						) : (
							<LoginFirstButton></LoginFirstButton>
						)}
					</div>
				</div>
			</div>
		</li>
	);
}

interface AddToCartProps {
	isInCart: boolean;
	pizza: MenuItem;
	onCustomizeClick: (pizza: MenuItem) => void;
	soldOut: boolean;
	currentQuantity: number;
}

function AddToCartButton({
	isInCart,
	pizza,
	onCustomizeClick,
	currentQuantity,
}: AddToCartProps) {
	const dispatch = useDispatch();
	const { id, name, unitPrice, ingredients, soldOut } = pizza;

	function handleAddToCart() {
		const newItem = {
			pizzaId: id,
			name,
			quantity: 1,
			unitPrice,
			ingredients,
			totalPrice: unitPrice * 1,
		};
		dispatch(addItem(newItem));
	}
	return (
		<>
			{isInCart && (
				<div className="flex items-center !w-full justify-start gap-2 min-[375px]:gap-2 sm:gap-4 min-[425px]:justify-end">
					<button
						className="text-[10px] min-[375px]:text-xs py-1 px-2 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 sm:text-sm sm:py-2  xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
						onClick={(e) => {
							e.preventDefault();
							onCustomizeClick(pizza);
						}}
					>
						Customize
					</button>
					<UpdateItemQuantity
						pizzaId={id}
						currentQuantity={currentQuantity}
					></UpdateItemQuantity>

					<DeleteItem pizzaId={id}></DeleteItem>
				</div>
			)}

			{!soldOut && !isInCart && (
				<button
					className="text-[10px] min-[375px]:text-xs py-1 px-2 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 sm:text-sm sm:py-2  xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
					onClick={handleAddToCart}
				>
					Add to cart
				</button>
			)}
		</>
	);
}

function LoginFirstButton() {
	return (
		<button
			className="text-[10px] min-[375px]:text-xs py-1 px-2 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 sm:text-sm sm:py-2  xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed"
			onClick={() => {
				toast("Please Log In First!", {
					icon: "⚠️",
				});
			}}
		>
			Add To Cart
		</button>
	);
}

export default MenuItems;
