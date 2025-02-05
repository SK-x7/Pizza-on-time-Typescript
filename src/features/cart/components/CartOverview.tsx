import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector, useStore} from "react-redux"
import { getCart, getTotalCartPrice, getTotalCartQuantity } from '../cartSlice';
import { useEffect, useState } from 'react';
import { initialUserState, isUserAuthenticated, updateUser } from '../../users/userSlice';
import { UserInterface } from '../../../UiComponents/ProtectedLayout';
import { toast } from 'react-hot-toast';

function CartOverview() {
  const isLoggedIn = useSelector(isUserAuthenticated)
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const location = useLocation();
  if(location.pathname==="/") return null;
  if(!isLoggedIn) return null;
    if(!totalCartQuantity)  return null;
    
   
  
    
    
  return (
    <div className="flex items-center justify-between min-h-8 sm:min-h-12 bg-stone-800 sticky bottom-0 z-50 w-full px-4 py-3 sm:py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}.00</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
