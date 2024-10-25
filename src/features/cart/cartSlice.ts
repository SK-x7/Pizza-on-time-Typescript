import { createSlice } from "@reduxjs/toolkit"
import { itemInCart } from "./components/CartItem";


interface cartIntitialState{
    cart:itemInCart[]
}

const initialState:cartIntitialState={
    cart:
    [
        // {
        //     pizzaId:12,
        //     name:"onion capcicum",
        //     quantity:5,
        //     unitPrice:16,
        //     totalPrice:80
        // }
    ],
}

const cartSlice =createSlice({
    name:'cart',
    initialState,
    reducers:{
        addItem(state,action){
            state.cart.push(action.payload);
        },
        
        deleteItem(state,action){
            state.cart=state.cart.filter(item=>item.pizzaId!==action.payload);
        },
        
        increaseItemQuantity(state,action){
        const item=state.cart.find(item=>item.pizzaId===action.payload);
        if(item){
            
            item.quantity+=1;
            item.totalPrice=item.quantity*item.unitPrice;
        }
            
        
        },
        
        decreaseItemQuantity(state,action){
            const item=state.cart.find(item=>item.pizzaId===action.payload);
            if(item){
                
                item.quantity-=1;
                item.totalPrice=item.quantity*item.unitPrice;
                if(item.quantity===0) cartSlice.caseReducers.deleteItem(state,action);
            }
        },
        
        
        clearCart(state){
            state.cart=[]
        },
        // addItem(state,action){},
        // addItem(state,action){},
    }
})

export const{addItem,deleteItem,increaseItemQuantity,decreaseItemQuantity,clearCart} =cartSlice.actions;


export const getCart = (state:{cart:cartIntitialState})=>state.cart.cart;


export const getCurrentCartQuantityById =(id:number)=>(state:{cart:cartIntitialState})=>state.cart.cart.find((item:itemInCart)=>item.pizzaId ===id)?.quantity??0

export const getTotalCartQuantity=(state:{cart:cartIntitialState})=>state.cart.cart.reduce((sum:number,item:itemInCart)=>sum+item.quantity,0)

export const getTotalCartPrice=(state:{cart:cartIntitialState})=>state.cart.cart.reduce((sum:number,item:itemInCart)=>sum+item.totalPrice,0)

// reselect library

export default cartSlice.reducer;