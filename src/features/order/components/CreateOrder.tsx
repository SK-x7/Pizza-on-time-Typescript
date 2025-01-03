import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionFunctionArgs, Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../../apis/apiRestaurant';
import Button from '../../../UiComponents/Button'
import {clearCart, getCart, getTotalCartPrice} from "../../cart/cartSlice";
import EmptyCart from "../../cart/components/EmptyCart"
import store, { RootState,AppDispatch } from "../../../store"
// import { formatCurrency } from '../../utilities/helpers';
import { fetchAddress, getUserId, getUserName } from '../../users/userSlice';
import { itemInCart } from '../../cart/components/CartItem';
import { getEstimatedDeliveryTime } from '../../../utils/helpers';
// import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str:string) =>
/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
  str
  );
  
  
  
  interface ErrorsInForm{
    phone?: number|string;
  } 
  
  export interface newOrderInterface{
    // data:FormDataEntryValue;
    address?:string;
    cart:itemInCart[];
    customer?:string;
    orderPrice?:number;
    phone:string|number;
    position?:string;
    priority:boolean;
    priorityPrice?:number;
    status?:string;
    userId?:string;
    estimatedDelivery:Date;
  }
  
  export interface finalOrderInterface{
    id:number;
    created_at:Date;
    // data:FormDataEntryValue;
    address:string;
    cart:itemInCart[];
    customer:string;
    orderPrice:number;
    phone:string|number;
    position?:string;
    priority:boolean;
    priorityPrice:number;
    status:string;
    userId:string;
    estimatedDelivery:Date;
  }
  
  
  function CreateOrder() {
    const dispatch = useDispatch<AppDispatch>();
    const [withPriority, setWithPriority] = useState(false);
  const {username:firstName,status:addressStatus,position,address,error:errorAddress} = useSelector((state:RootState)=>state.user);
  const username = useSelector(getUserName);
  const isLOadingAddress = addressStatus==='loading';

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  
  const cart = useSelector(getCart);
  const userId = useSelector(getUserId);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice=withPriority?totalCartPrice*0.2:0;
  const totalPrice = totalCartPrice+priorityPrice;
  if(!cart.length)  return <EmptyCart></EmptyCart>
  

  
  
    async function handleFormSubmit(e:FormEvent) {
      e.preventDefault();
      const formElement=e.target as HTMLFormElement;
      const formData=new FormData(formElement);
      const estimatedDelivery=getEstimatedDeliveryTime(3,5);
      const data:newOrderInterface={
        customer: formData.get('customer') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        priority: formData.get('priority') === 'true',
        cart,
        userId,
        status:"preparing",
        estimatedDelivery,
      }
      console.log(data);
      return await createOrder(data,totalCartPrice);
    }

  
  const formErrors = useActionData() as ErrorsInForm;
  
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" required placeholder={firstName||username||"Enter your name"} defaultValue={firstName||username}/>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required placeholder='Enter your phone number'/>
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              disabled={isLOadingAddress}
              defaultValue={address}
              placeholder='Enter your address'
            />
              {addressStatus==='error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          
          {position&&!position.latitude && !position.longitude&&
          <span className='absolute right-[3px] z-10 top-[3px] sm:right-[5px] md:top-[5px]' >
        <Button disabled={isLOadingAddress} type='small'  onClick={(e)=>{
          e.preventDefault();
          dispatch(fetchAddress())}}>Get Position</Button>
          </span>}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority as unknown as string}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position&&position.longitude&&position.latitude?`${position.latitude},${position.longitude}`:''} />
          <Button disabled={isSubmitting||isLOadingAddress} type="primary">
            {isSubmitting ? 'Placing order....' : `Order now for $ ${Math.round(totalPrice)}`}
          </Button>
        </div>
      </form>
    </div>
  );
}



export default CreateOrder;
