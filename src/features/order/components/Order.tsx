// Test ID: IIDSAT

import OrderItem from './OrderItem';

import { LoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder, updateOrderStatus } from '../../../apis/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';
import { itemInCart } from '../../cart/components/CartItem';
import {MenuItem} from "../../menu/menuInterfaces"
import { o } from './MyOrders';
import { finalOrderInterface } from './CreateOrder';
import CancelOrder from '../../cart/components/CancelOrder';
import Button from '../../../UiComponents/Button';
import { useUiContext } from '../../../contexts/UiContexts';
import RegularModal from '../../../UiComponents/RegularModal';
import EditOrderModal from '../../cart/components/EditOrderModal';


export interface orderInterface{
    id:number;
    status:"preparing"|string;
    priority:boolean;
    priorityPrice:number;
    orderPrice:number;
    estimatedDelivery:string;
    cart:itemInCart[];
    
    
  }


function Order() {
  let order = useLoaderData() as finalOrderInterface;
  const fetcher = useFetcher();
  useEffect(function () {
    if(!fetcher.data&&fetcher.state==='idle') fetcher.load('/menu');
  },[fetcher])
  
  const {isRegularModalOpen,toggleModel,selectedEditOrder,setSelectedEditOrder,editAction} = useUiContext();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff

  if(!order) return null;
  
  // useEffect(() => {
  //   const checkOrders = async () => {
  //     console.log("checking orders");
  //     if (new Date(order.estimatedDelivery) < new Date() && order.status === 'preparing') {
  //         // Send an update request to Supabase
  //         console.log("inside if");
  //         order=await updateOrderStatus(order.id);
      
  //   };
    
  // }
  //   // Check orders every 5 minutes
  //   const interval = setInterval(checkOrders, 5000);
  
  //   // Clean up interval on component unmount
  //   return () => {
  //     console.log("Interval clearnup");
  //     clearInterval(interval)};
  // }, []);
  
  
  
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    customer,
    
  } = order;
  
  console.log(typeof priorityPrice,priorityPrice)
  
  if(!order) return null;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='flex flex-col 
    justify-start sm:gap-0 sm:justify-between items-center w-full max-w-screen-lg bg-gray-200 !h-full px-1 !min-h-full pt-[1px] pb-1'>
    {/* <div className='flex flex-col justify-center items-center w-full divide-y-4'> */}
    <div className='flex flex-col justify-center items-center w-full divide-y-4'>
    
      <div className='w-full flex justify-center items-center !h-full py-3 sm:py-5 font-mono bg-gray-300'>
        <span className='capitalize text-2xl sm:text-3xl'>Order id # {id}</span>
      </div>
    <div className="space-y-4 sm:space-y-4 py-4 sm:py-6 w-full">
      <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 px-3">
        {/* <h2 className="text-xl font-semibold">Order #{id} status</h2> */}
        <h2 className="text-lg sm:text-xl font-semibold">Customer name : {customer}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-xs sm:text-sm font-semibold uppercase tracking-wide text-green-50">
            {status}
          </span>
        </div>
      </div>

      {/* <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5"> */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-2 px-3 sm:px-6 py-3 sm:py-5 bg-gray-300">
        <p className="font-medium text-sm sm:text-base">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y divide-gray-200 border-b border-t  overflow-y-scroll h-20 custom-scroll bg-gray-200">
        {cart.map((item:itemInCart) => (
          <OrderItem item={item} key={item.pizzaId} 
          isLoadingIngredients={fetcher.state==='loading'}
          ingredients={item.ingredients} />
        ))}
      </ul>

      {/* <div className="space-y-2 bg-stone-200 px-6 py-5 text-left"> */}
      <div className="space-y-1 sm:space-y-2 px-3 py-3 sm:px-6 sm:py-5 text-left bg-gray-300">
        <p className="text-xs sm:text-sm font-medium text-stone-600">
          Price pizza:{formatCurrency(orderPrice,priorityPrice)}
        </p>
        {/* FIXME */}
        {priority && (
        // {!priority && (
          <p className="text-xs sm:text-sm font-medium text-stone-600">
            Price priority: 
             {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold text-sm sm:text-base">
          To pay on delivery: {formatCurrency(orderPrice)}
        </p>
      </div>
      <div className='flex gap-2 justify-end items-center px-2 lg:!mt-12'>
        
    {/* <Button type='primary'>Hello</Button> */}
    {/* <Button type='primary'>noob</Button> */}
    {isRegularModalOpen && selectedEditOrder &&editAction && (
        <RegularModal onClose={() => { setSelectedEditOrder(null); toggleModel(); }}>
          {/* <CustomizeOrder 
            id={selectedPizza.id} 
            allIngredients={selectedPizza.allIngredients} 
            ingredients={selectedPizza.ingredients}
          /> */}
          <EditOrderModal status={order.status} estimatedDelivery={order.estimatedDelivery} created_at={order.created_at} editAction={editAction} orderId={selectedEditOrder}></EditOrderModal>
        </RegularModal>
      )}
        <CancelOrder order={order}/>
      {!priority&&<UpdateOrder order={order}></UpdateOrder>}
      {/* <button className='bg-yellow-400 flex justify-center items-center text-sm py-1 px-4 rounded-lg min-[425px]:text-base md:text-lg md:px-6   text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'>Cancel</button>
      <button className='bg-yellow-400 flex justify-center items-center text-sm py-1 px-4 rounded-lg min-[425px]:text-base md:text-lg md:px-6'>Update</button> */}
      
      
  
      </div>
    </div>
    </div>
        <span  className=' text-red-700 text-xs sm:text-sm md:text-base font-semibold mb-1'>Note : You can only set priority and cancel order before the order is dispatched . These actions are non-reversible.</span>
        </div>
  );
}

export async function loader({ params }:LoaderFunctionArgs) {
  console.log(params.orderId);
  const order = await getOrder(params.orderId as string);
  console.log(order,"2️⃣");
  if (new Date(order.estimatedDelivery) < new Date() && order.status !== 'delivered') {
    // Send an update request to Supabase
    console.log("inside if");
    return await updateOrderStatus(order.id,"delivered");

};

  const currentTime=new Date();
  const estimatedDeliveryTime = new Date(order.estimatedDelivery);
  const orderCreationTime=new Date(order.created_at);
  const halfTimeInterval = orderCreationTime.getTime()+(estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2;
  if (currentTime.getTime()  >= halfTimeInterval && order.status === 'preparing') {
    // Send an update request to Supabase
    console.log("Updating order status based on time conditions");
    return await updateOrderStatus(order.id,"dispatched");
}
  
  return order;
}

export default Order;
