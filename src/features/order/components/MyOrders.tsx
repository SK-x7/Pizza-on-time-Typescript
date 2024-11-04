import React from 'react'
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../apis/apiRestaurant';
import store from '../../../store';
import { getUserId } from '../../users/userSlice';
import { newOrderInterface } from './CreateOrder';
import { orderInterface } from './Order';

export interface o extends newOrderInterface{
    id:number;
    createdAt:Date;
}

export default function MyOrders() {
    const navigate=useNavigate();
    function handleClick(id:number) {
        return navigate(`/order/${id}`);
    }
    
    
    const orders=useLoaderData() as o[];
    
    console.log(orders);
  return (
    <div className='flex flex-col justify-center items-center gap-3 !w-full mt-1 bg-gray-200 px-3 pt-5'>
        <div>
            <h1 className='capitalize text-3xl mb-3'>My orders</h1>
        </div>
        <div className=' flex justify-evenly items-start border-black border-y-[1px] gap-8 px-2 py-4 w-full font-semibold'>
            <span className='capitalize w-full flex justify-center items-center'>Order Id</span>
            <span className='capitalize w-full flex justify-center items-center '>Estimated delivery</span>
            <span className='capitalize w-full flex justify-center items-center'>Customer name</span>
            <span className='capitalize w-full flex justify-center items-center'>Total price</span>
            <span className='capitalize w-full flex justify-center items-center'>order status</span>
            <span className='capitalize w-full flex justify-center items-center'>view details</span>
        </div>
        <div className='flex flex-col justify-center items-center !w-full gap-3'>
            
        {
            orders&&orders.map((order)=>(
                <ul className='flex justify-center items-center gap-8 rounded-md !w-full flex-grow border-b-[1px] border-gray-300 py-1'>
            <span className='capitalize w-full flex justify-center items-center'>{order.id}</span>
            <span className='capitalize w-full flex justify-center items-center'>{new Date(order.estimatedDelivery).toLocaleString()}</span>
            <span className='capitalize w-full flex justify-center items-center'>{order.customer}</span>
            <span className='capitalize w-full flex justify-center items-center'>{order.orderPrice}</span>
            <span className='capitalize w-full flex justify-center items-center'>{order.status}</span>
            <button className='capitalize w-full text-blue-600 flex justify-center items-center' onClick={(e)=>{e.preventDefault();handleClick(order.id);}}>view details ➡️</button>
        </ul>
                
                ))
            }
            </div>
    </div>
  )
}

export async function fetchOrdersFromApi(){
    const state=store.getState();
    const user=state.user;
    const id=user.user?.user_id;
    if(id){
        
        const orders=await fetchOrders(id);
        return orders;
    }
    else toast.error("error");
    return null;
}
