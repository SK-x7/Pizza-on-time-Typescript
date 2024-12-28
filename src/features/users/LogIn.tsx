import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionFunctionArgs, Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../UiComponents/Button';
import { supabase } from '../../apis/apiRestaurant';
import { toast } from 'react-hot-toast';
import { loginFormDataInterface, loginUser } from '../../apis/apiUsers';
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
      <div className='flex !w-full h-full border'>
        <div className="w-1/2  items-center pt-16 pb-3  border-none flex flex-col gap-5">
        <div className=' flex flex-col gap-3 justify-start items-start w-3/4'>
            
      <h1 className='capitalize text-4xl !text-left text-green-600 font-bold'>welcome to pizza-on-time co.</h1>
          <p className='text-left text-base w-3/4 text-green-600 font-semibold'>"Craving pizza? [Your Website Name] brings fresh, hot, and delicious pizzas right to your door. Customize your favorite flavors and enjoy fast delivery with just a few clicks. Your perfect slice is just an order away!"</p>
          <hr className="font-extrabold bg-green-600 h-[3px] w-3/4 "/>
       
        </div>


      {/* <Form method="POST" action="/order/new"> */}
      <div className='flex flex-1 w-3/4'>
        
      <Form method="POST" className='flex w-3/4  px-5 ring-1 ring-green-600 flex-col justify-evenly  border rounded-xl'>
        <h1 className='capitalize text-xl font-semibold text-green-600'>Welcome back👋😄</h1>
<div className="flex !flex-col gap-4 items-start justify-center w-full">
  <div className='flex !flex-col items-start justify-evenly w-full'>
    <label className="capitalize text-left grow py-2 w-full text-lg text-green-600 font-semibold">Enter your Email :</label>
    <input className="input grow p-2 ring-1 ring-green-400 w-full  rounded-xl" type="email" name="email" required placeholder='Enter your email'/>
  </div>
  <div className="flex !flex-col gap-1 items-start justify-center w-full">
    <label className="capitalize text-left grow py-2  w-full  rounded-xl text-green-600 text-lg font-semibold">Enter your password :</label>
    <input className="input  grow p-2 ring-1 ring-green-400 w-full  rounded-xl" type="password" name="password" required placeholder='Enter Password'/>
  </div>
  </div>

  <Button  type="primary" >
      Log-in now
    </Button>
<div className=" mt-0 flex justify-center text-xs text-green-600 font-semibold">
    {/* <label className="sm:basis-40">Email :</label> */}
      <Link to="/signup" className='underline underline-offset-2'>Don't have an account ?</Link>
  </div>
  
</Form>
      </div>
      
    </div>
    
    
    
    <div className={`flex w-1/2`}>
        {/* <div className={`flex flex-col w-2/3 items-center py-6 justify-start gap-2 px-auto`}> */}
          {/* <h1 className='capitalize text-4xl'>welcome to pizza-on-time co.</h1>
          <p className='text-left text-base w-3/4'>"Craving pizza? [Your Website Name] brings fresh, hot, and delicious pizzas right to your door. Customize your favorite flavors and enjoy fast delivery with just a few clicks. Your perfect slice is just an order away!"</p>
        */}
        <img className='object-cover' src='../../../public/76745d89868413.5e04311b1b5f4-removebg-preview.png'/>
        </div> 
    </div>
  );
}

export async function action({ request }:ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const obj:loginFormDataInterface={
    email:data.email as string,
    password:data.password as string
  }
  return await loginUser(obj);
  
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

  // const newOrder = await SignUp(order);
//   console.log(newOrder,"1️⃣");
//   store.dispatch(clearCart());
  // return redirect(`/home`);

  // return null;
}

export default Login;































//FIXME - original code
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ActionFunctionArgs, Form, Link, redirect, useActionData, useNavigation } from 'react-router-dom';
// import Button from '../../UiComponents/Button';
// import { supabase } from '../../apis/apiRestaurant';
// import { toast } from 'react-hot-toast';
// import { loginFormDataInterface, loginUser } from '../../apis/apiUsers';
// // import { createOrder } from '../../../apis/apiRestaurant';
// // import Button from '../../../UiComponents/Button'
// // import {clearCart, getCart, getTotalCartPrice} from "../../cart/cartSlice";
// // import EmptyCart from "../../cart/components/EmptyCart"
// // import store, { RootState,AppDispatch } from "../../../store"
// // import { formatCurrency } from '../../utilities/helpers';
// // import { fetchAddress } from '../../users/userSlice';
// // import Button from '../../ui/Button';

// // https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str:string) =>
// /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//   str
//   );
  
  
  
// //   interface ErrorsInForm{
// //     phone?: number|string;
// //   } 
  
// //   export interface newOrderInterface{
// //     // data:FormDataEntryValue;
// //     phone:string|number;
// //     cart:any;
// //     priority:boolean;
// //   }
  
  



//   function Login() {
//     return (
//     <div className="sm:px-4 xl:px-7 py-6 min-w-72 ring-1 ring-neutral-400 border-none  xl:w-[25vw] rounded-lg flex flex-col gap-8">
//         <div className=' flex flex-col gap-3'>
            
//       <h2 className="text-3xl font-semibold capitalize text-yellow-500">Welcome Back ‼️</h2>
//       <h2 className="text-2xl font-semibold capitalize text-yellow-500">Log In</h2>
//         </div>


//       {/* <Form method="POST" action="/order/new"> */}
//       <Form method="POST" className='flex flex-col justify-center'>

//       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
//           {/* <label className="sm:basis-40">Email :</label> */}
//           <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="email" name="email" required placeholder='Enter your email'/>
//         </div>
//       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
//           {/* <label className="sm:basis-40">Email :</label> */}
//           <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="password" name="password" required placeholder='Enter Password'/>
//         </div>

//         <Button  type="primary" >
//             Log-in now
//           </Button>
//       <div className=" mt-5 flex justify-center text-xs text-blue-600 font-semibold">
//           {/* <label className="sm:basis-40">Email :</label> */}
//             <Link to="/signup" className='underline underline-offset-2'>Don't have an account ?</Link>
//         </div>
        
//       </Form>
//     </div>
//   );
// }

// export async function action({ request }:ActionFunctionArgs) {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log(data);
//   const obj:loginFormDataInterface={
//     email:data.email as string,
//     password:data.password as string
//   }
//   return await loginUser(obj);
  
// //   const order:newOrderInterface = {
// //     ...data,
// //     phone:data.phone as string,
// //     cart: JSON.parse(data.cart as string),
// //     priority: data.priority === 'true',
// //   };
  
// //   const errors:ErrorsInForm = {};
// //   if (!isValidPhone(order.phone as string))
// //     errors.phone =
// //       'Please give us your correct phone number. We might need it to contact you.';

// //   if (Object.keys(errors).length > 0) return errors;

//   // If everything is okay, create new order and redirect

//   // const newOrder = await SignUp(order);
// //   console.log(newOrder,"1️⃣");
// //   store.dispatch(clearCart());
//   // return redirect(`/home`);

//   // return null;
// }

// export default Login;
