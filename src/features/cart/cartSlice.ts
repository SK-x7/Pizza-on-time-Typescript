import { createSlice } from "@reduxjs/toolkit";
import { itemInCart } from "./components/CartItem";

interface cartIntitialState {
	cart: itemInCart[];
	cartPrice: number;
}

const initialState: cartIntitialState = {
	cart: [],
	cartPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			state.cart.push(action.payload);
			state.cartPrice += action.payload.totalPrice;
		},
		updateIngredientsOfItem(state, action) {

			if (!action.payload.id) return;
			const itemToUpdate = state.cart.find(
				(item) => item.pizzaId === action.payload.id
			);
			if (itemToUpdate)
				itemToUpdate.ingredients = action.payload.addRemoveIngredients;
		},

		deleteItem(state, action) {
			state.cart = state.cart.filter((item) => {
				if (item.pizzaId === action.payload) {
					// Reduce the cartPrice only if the item matches
					state.cartPrice -= item.totalPrice;
					return false; // Exclude this item from the new array
				}
				return true;
			});
		},

		increaseItemQuantity(state, action) {
			const item = state.cart.find((item) => item.pizzaId === action.payload);
			if (item) {
				item.quantity += 1;
				item.totalPrice = item.quantity * item.unitPrice;
				state.cartPrice += item.unitPrice;
			}
		},

		decreaseItemQuantity(state, action) {
			const item = state.cart.find((item) => item.pizzaId === action.payload);
			if (item) {
				item.quantity -= 1;
				item.totalPrice = item.quantity * item.unitPrice;
				state.cartPrice -= item.unitPrice;
				if (item.quantity === 0)
					cartSlice.caseReducers.deleteItem(state, action);
			}
		},

		clearCart(state) {
			state.cart = [];
			state.cartPrice = 0;
		},
	},
});

export const {
	addItem,
	deleteItem,
	increaseItemQuantity,
	decreaseItemQuantity,
	clearCart,
	updateIngredientsOfItem,
} = cartSlice.actions;

export const getCart = (state: { cart: cartIntitialState }) => state.cart.cart;

export const getCurrentCartQuantityById =
	(id: number) => (state: { cart: cartIntitialState }) =>
		state.cart.cart.find((item: itemInCart) => item.pizzaId === id)?.quantity ??
		0;

export const getTotalCartQuantity = (state: { cart: cartIntitialState }) =>
	state.cart.cart.reduce(
		(sum: number, item: itemInCart) => sum + item.quantity,
		0
	);

export const getTotalCartPrice = (state: { cart: cartIntitialState }) =>
	state.cart.cartPrice;

export default cartSlice.reducer;
