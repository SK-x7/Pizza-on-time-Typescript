import LinkButton from '../../../UiComponents/LinkButton';
import CartItem, { itemInCart } from './CartItem';

import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getUserName } from '../../users/userSlice';
import { clearCart, getCart } from '../cartSlice';
import EmptyCart from './EmptyCart';
// import CartItem from './CartItem';

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const dispatch =useDispatch();
  const cart = useSelector(getCart);
  const username = useSelector(getUserName);
  const handleClearCart=()=>dispatch(clearCart());
  if(!cart.length) return <EmptyCart></EmptyCart>



  return (
    <div className="px-4 py-3 max-w-screen-lg !w-full flex flex-col justify-start items-start !h-full bg-gray-200">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart,{username}</h2>

      <ul className="mt-3 divide-y divide-gray-300 border-b w-full overflow-y-scroll border-t border-t-gray-600 px-2 py-1 ">
        {cart.map((item:itemInCart) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="mt-3 md:mt-6 space-x-2 flex">
        <Link to="/order/new" className='text-xs py-2 px-3 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 min-[425px]:text-sm sm:py-2 sm:text-base    xl:rounded-2xl bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'>
          Order pizzas
        </Link>

        <button className='text-xs py-2 px-3 min-[375px]:px-3  rounded-xl flex justify-center items-center   min-[425px]:px-4 min-[425px]:text-sm sm:py-2 sm:text-base    xl:rounded-2xl border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-600 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed' onClick={handleClearCart}>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
