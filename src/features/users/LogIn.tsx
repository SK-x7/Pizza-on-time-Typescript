import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionFunctionArgs, Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../UiComponents/Button';
// import { createOrder } from '../../../apis/apiRestaurant';
// import Button from '../../../UiComponents/Button'
// import {clearCart, getCart, getTotalCartPrice} from "../../cart/cartSlice";
// import EmptyCart from "../../cart/components/EmptyCart"
// import store, { RootState,AppDispatch } from "../../../store"
// import { formatCurrency } from '../../utilities/helpers';
// import { fetchAddress } from '../../users/userSlice';
// import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str:string) =>
/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
  str
  );
  
  
  
//   interface ErrorsInForm{
//     phone?: number|string;
//   } 
  
//   export interface newOrderInterface{
//     // data:FormDataEntryValue;
//     phone:string|number;
//     cart:any;
//     priority:boolean;
//   }
  
  
  function Login() {

  


  
  
  return (
    <div className="sm:px-4 xl:px-7 py-6 min-w-72 ring-1 ring-neutral-400 border-none  xl:w-[25vw] rounded-lg flex flex-col gap-8">
        <div className=' flex flex-col gap-3'>
            
      <h2 className="text-3xl font-semibold capitalize text-yellow-500">Welcome Back ‼️</h2>
      <h2 className="text-2xl font-semibold capitalize text-yellow-500">Log In</h2>
        </div>


      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className='flex flex-col justify-center'>

      <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
          {/* <label className="sm:basis-40">Email :</label> */}
          <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="email" name="email" required placeholder='Enter your email'/>
        </div>
      <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
          {/* <label className="sm:basis-40">Email :</label> */}
          <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="password" name="password" required placeholder='Enter Password'/>
        </div>

        <Button  type="primary" >
            Log-in now
          </Button>
      <div className=" mt-5 flex justify-center text-xs text-blue-600 font-semibold">
          {/* <label className="sm:basis-40">Email :</label> */}
            <Link to="/signup" className='underline underline-offset-2'>Don't have an account ?</Link>
        </div>
        
      </Form>
    </div>
  );
}

export async function action({ request }:ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  
  
//   const order:newOrderInterface = {
//     ...data,
//     phone:data.phone as string,
//     cart: JSON.parse(data.cart as string),
//     priority: data.priority === 'true',
//   };
  
//   const errors:ErrorsInForm = {};
//   if (!isValidPhone(order.phone as string))
//     errors.phone =
//       'Please give us your correct phone number. We might need it to contact you.';

//   if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect

//   const newOrder = await SignUp(order);
//   console.log(newOrder,"1️⃣");
//   store.dispatch(clearCart());
//   return redirect(`/order/${newOrder.id}`);

  // return null;
}

export default Login;
