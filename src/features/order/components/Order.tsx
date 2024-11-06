// Test ID: IIDSAT

import OrderItem from './OrderItem';

import { LoaderFunctionArgs, useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder, supabase, updateOrderStatus } from '../../../apis/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';
import { itemInCart } from '../../cart/components/CartItem';
import {MenuItem} from "../../menu/menuInterfaces"
import { fetchOrdersFromApi, o } from './MyOrders';
import { finalOrderInterface } from './CreateOrder';


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
    <div className='flex flex-col justify-center items-center border-y-2 border-gray-300 my-8 w-full divide-y-4'>
    
      <div className='w-full flex justify-center items-center !h-full py-5 font-mono'>
        <span className='capitalize text-3xl'>Order id # {id}</span>
      </div>
    <div className="space-y-8 py-6 w-full ">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* <h2 className="text-xl font-semibold">Order #{id} status</h2> */}
        <h2 className="text-xl font-semibold">Customer name : {customer}</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t px-3">
        {cart.map((item:itemInCart) => (
          <OrderItem item={item} key={item.pizzaId} 
          isLoadingIngredients={fetcher.state==='loading'}
          ingredients={fetcher?.data?.find((el:MenuItem)=>el?.id===item.pizzaId)?.ingredients??[]} />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza:{formatCurrency(orderPrice,priorityPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: 
             {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice)}
        </p>
      </div>
      {!priority&&<UpdateOrder order={order}></UpdateOrder>}
    </div>
    </div>
  );
}

export async function loader({ params }:LoaderFunctionArgs) {
  console.log(params.orderId);
  const order = await getOrder(params.orderId as string);
  console.log(order,"2️⃣");
  if (new Date(order.estimatedDelivery) < new Date() && order.status === 'preparing') {
    // Send an update request to Supabase
    console.log("inside if");
    return await updateOrderStatus(order.id);

};
  
  return order;
}

export default Order;
