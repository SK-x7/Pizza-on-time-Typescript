import { toast } from "react-hot-toast";
import { ActionFunctionArgs, Form, Link } from 'react-router-dom';
import { signupFormDataInterface, signUser } from '../../apis/apiUsers';
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
  
  
  function SignUp() {

  


  
  
  return (
    <div className='flex !w-full h-full border'>
        <div className="w-1/2  items-center pt-7 pb-3  border-none flex flex-col gap-3">
        <div className=' flex flex-col gap-3 justify-start items-start w-3/4'>
            
      <h1 className='capitalize text-4xl !text-left text-green-600 font-bold'>welcome to pizza-on-time co.</h1>
          <p className='text-left text-base w-3/4 text-green-600 font-semibold'>"Craving pizza? [Your Website Name] brings fresh, hot, and delicious pizzas right to your door. Customize your favorite flavors and enjoy fast delivery with just a few clicks. Your perfect slice is just an order away!"</p>
          <hr className="font-extrabold bg-green-600 h-[3px] w-3/4 "/>
       
        </div>


      {/* <Form method="POST" action="/order/new"> */}
      <div className='flex flex-1 w-3/4'>
        
             <Form method="POST" className='flex w-3/4  px-5 ring-1 ring-green-600 flex-col justify-evenly  border rounded-xl'>
              <h1 className="capitalize text-xl font-semibold text-green-600 my-2">Create your account</h1>
       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
           <input className="input grow p-2 ring-1 ring-green-400 rounded-xl" type="text" name="username" defaultValue="test" required placeholder='Enter your name'/>
         </div>
           {/* <label className="sm:basis-40">Username</label> */}
       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
           {/* <label className="sm:basis-40">Email :</label> */}
           <input className="input grow p-2 ring-1 ring-green-400  rounded-xl" type="email" name="email" defaultValue="test@gmail.com" required placeholder='Enter your email'/>
         </div>
       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
           {/* <label className="sm:basis-40">Email :</label> */}
           <input className="input grow p-2 ring-1 ring-green-400  rounded-xl" type="password" name="password" defaultValue="test12" required placeholder='Enter Password'/>
         </div>
       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
           {/* <label className="sm:basis-40">Email :</label> */}
           <input className="input grow p-2 ring-1 ring-green-400  rounded-xl" type="password" name="verifyPassword" defaultValue="test12" required placeholder='Verify Password:Re-Enter Password'/>
         </div>
         <Button  type="primary" >
             Sign-up now
           </Button>
           <div className=" mt-2 flex justify-center text-xs text-green-600 font-semibold">
           {/* <label className="sm:basis-40">Email :</label> */}
             <Link to="/login" className='underline underline-offset-2'>Already have an account ?</Link>
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
  if(data.password!==data.verifyPassword){
    toast.error("password and verify password does not match‼️")
    return null;
  }
  const obj:signupFormDataInterface={
    username:data.username as string,
    password:data.password as string,
    email:data.email as string
    
  }
  return await signUser(obj);
}

export default SignUp;














// import { toast } from "react-hot-toast";
// import { ActionFunctionArgs, Form, Link } from 'react-router-dom';
// import { signupFormDataInterface, signUser } from '../../apis/apiUsers';
// import Button from '../../UiComponents/Button';
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
  
  
//   function SignUp() {

  


  
  
//   return (
//     <div className="sm:px-4 xl:px-7 py-6 min-w-72 ring-1 ring-neutral-400 border-none  xl:w-[25vw] rounded-lg flex flex-col gap-8">
//         <div className=' flex flex-col'>
            
//       <h2 className="text-3xl font-semibold capitalize text-yellow-500">Sign up</h2>
//       {/* <h2 className="text-xl font-semibold capitalize text-yellow-500">sign up</h2> */}
//         </div>


//       {/* <Form method="POST" action="/order/new"> */}
//       <Form method="POST" className='flex flex-col justify-center'>
//       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
//           {/* <label className="sm:basis-40">Username</label> */}
//           <input className="input grow p-2 ring-1 ring-neutral-400 rounded-xl" type="text" name="username" defaultValue="test" required placeholder='Enter your name'/>
//         </div>
//       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
//           {/* <label className="sm:basis-40">Email :</label> */}
//           <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="email" name="email" defaultValue="test@gmail.com" required placeholder='Enter your email'/>
//         </div>
//       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
//           {/* <label className="sm:basis-40">Email :</label> */}
//           <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="password" name="password" defaultValue="test12" required placeholder='Enter Password'/>
//         </div>
//       <div className="mb-5 flex flex-col gap-0 sm:flex-row sm:items-center">
//           {/* <label className="sm:basis-40">Email :</label> */}
//           <input className="input grow p-2 ring-1 ring-neutral-400  rounded-xl" type="password" name="verifyPassword" defaultValue="test12" required placeholder='Verify Password:Re-Enter Password'/>
//         </div>
//         <Button  type="primary" >
//             Sign-up now
//           </Button>
//           <div className=" mt-5 flex justify-center text-xs text-blue-600 font-semibold">
//           {/* <label className="sm:basis-40">Email :</label> */}
//             <Link to="/" className='underline underline-offset-2'>Already have an account ?</Link>
//         </div>
        
//       </Form>
//     </div>
//   );
// }

// export async function action({ request }:ActionFunctionArgs) {

//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   console.log(data);
//   if(data.password!==data.verifyPassword){
//     toast.error("password and verify password does not match‼️")
//     return null;
//   }
//   const obj:signupFormDataInterface={
//     username:data.username as string,
//     password:data.password as string,
//     email:data.email as string
    
//   }
//   return await signUser(obj);
// }

// export default SignUp;
