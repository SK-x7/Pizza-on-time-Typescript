
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../../apis/apiRestaurant';
import { AppDispatch, RootState } from "../../../store";
import Button from '../../../UiComponents/Button';
import { getCart, getTotalCartPrice } from "../../cart/cartSlice";
import EmptyCart from "../../cart/components/EmptyCart";
import bcrypt from 'bcryptjs';
import { getEstimatedDeliveryTime } from '../../../utils/helpers';
import { itemInCart } from '../../cart/components/CartItem';
import { fetchAddress, getUserId, getUserName } from '../../users/userSlice';


  
  
  
  interface ErrorsInForm{
    phone?: number|string;
    customer?:string
    orderPin?:string
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
    orderPin?:string
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
    orderPin:string;
    estimatedDelivery:Date;
  }
  
  
  function CreateOrder() {
    const dispatch = useDispatch<AppDispatch>();
    const formErrors = useActionData() as ErrorsInForm;

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
  
    
  async function handlePasswordHashing(myPlainTextPassword:string){
    return await bcrypt.hash(myPlainTextPassword, 6);  
  } 
  
  
    async function handleFormSubmit(e:FormEvent) {
      e.preventDefault();
      const formElement=e.target as HTMLFormElement;
      const formData=new FormData(formElement);
      const estimatedDelivery=getEstimatedDeliveryTime(3,5);
      let tempPass:string|undefined =await handlePasswordHashing(formData.get('orderPin') as string)
      const data:newOrderInterface={
        customer: formData.get('customer') as string,
        phone: formData.get('phone') as string,
        address: formData.get('address') as string,
        priority: formData.get('priority') === 'true',
        orderPin: tempPass,
        cart,
        userId,
        status:"preparing",
        estimatedDelivery,
      }
      tempPass = undefined;
      return await createOrder(data,totalCartPrice);
    }

  
  
  return (
    <div className="px-4 py-4 sm:py-6 !text-sm sm:!text-base w-full max-w-screen-md ">
      <h2 className="mb-4 sm:mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
        <div className=" flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="text-left sm:basis-40">First Name :</label>
          <div className='grow'>
            
          <input className="input w-full relative p-2 capitalize" type="text" name="customer" required placeholder={firstName||username||"Enter your name"} maxLength={100} defaultValue={firstName||username}/>
          {
            formErrors?.customer&&(
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.customer}
              </p>
            )
          }
          </div>
        </div>

        <div className=" flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 text-left">Phone number :</label>
          <div className="grow">
            <input className="input w-full relative p-2 bg-white  capitalize" type="tel" name="phone" required placeholder='Enter your phone number'/>
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className=" flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40 text-left">Address :</label>
          <div className="grow">
            <input
              className="input w-full !relative p-2 bg-white   capitalize"
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
          <span className='absolute bottom-1  right-[2px] z-10 sm:bottom-[2px]' >
        <button className='bg-yellow-400 py-1 px-3   text-sm sm:py-2 rounded-lg sm:rounded-xl font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed' disabled={isLOadingAddress}  onClick={(e)=>{
          e.preventDefault();
          dispatch(fetchAddress())}}>Get Position</button>
          </span>}
        </div>
          
        <div className=" flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40 text-left">Order Pin :</label>
          <div className="grow">
            <input className="input w-full relative p-2 text-base capitalize bg-white " type="text" name="orderPin" required placeholder='Set the order pin'/>
            {formErrors?.orderPin && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.orderPin}
              </p>
            )}
          </div>
        </div>
          
          
        <div className="mb-2 sm:mb-5 lg:mb-9   flex items-center gap-3 sm:gap-5">
          <input
            className="h-4 w-4 sm:h-6 sm:w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority as unknown as string}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium text-left">
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