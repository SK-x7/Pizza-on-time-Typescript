import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchOrders } from '../../../apis/apiRestaurant';
import { initialUserState } from '../../users/userSlice';
import { newOrderInterface } from './CreateOrder';
import OrderFilterBy from './OrderFilterBy';
import OrderSortBy from './OrderSortBy';
import '../../../index.css';


export interface o extends newOrderInterface{
    id:number;
    created_at:Date;
    orderPrice:number;
    
}



export default function MyOrders() {
    const userId = useSelector((state:{user:initialUserState})=>state?.user?.user?.user_id);
    const navigate=useNavigate();
    const [searchParams] =useSearchParams();
    const [orders,setOrders]=useState<o[]|[]>([]);
    
    
    
    useEffect(() => {
      async function fetchOrdersFromApi() {
        if(!userId) return null;
        const orders=await fetchOrders(userId);
        if(orders){
            setOrders(orders);
        }else{
            return null;
        }
      }
      
      fetchOrdersFromApi();
    }, [userId])
    
    
    const currentFilter = searchParams.get("status")||"all";
    const currentSortBy = searchParams.get("sortBy")||"created_at-desc";
    const sortByField = currentSortBy.split("-")[0];
    const modifier = (currentSortBy.split("-")[1]==="asc")?1:-1;
    
    let filteredOrders:o[]|[] = [];
    let sortedOrders:o[]|[] = [];
    
    if(currentFilter==="all"){
        filteredOrders = orders
    }else if (currentFilter==="cancelled"||currentFilter==="delivered"){
        filteredOrders = orders && orders.filter((order)=>order.status===currentFilter);
    }else{
        filteredOrders = orders;
    }
    
    if(sortByField==="created_at"){
    sortedOrders = filteredOrders&& filteredOrders.sort((a,b)=>{
            return (new Date(a.created_at).getTime()-new Date (b.created_at).getTime())*modifier
        })
    }else if(sortByField==="orderPrice"){
        sortedOrders = filteredOrders&& filteredOrders.sort((a,b)=>{
                return (a.orderPrice-b.orderPrice)*modifier
            })
    }else{
        sortedOrders = filteredOrders
    }
    
    
    function handleClick(id:number) {
        return navigate(`/order/${id}`);
    }
    
    
    if(!orders) return <>Loading.........</>
    
    
  return (
    <div className='py-1 w-full h-full flex justify-center items-start !min-h-full'>
    <div className='flex flex-col h-full justify-start items-center gap-3 !z-30 !w-full !max-w-screen-lg bg-gray-200 px-2 sm:px-3 pt-4 sm:pt-10'>
        <div className='flex flex-col sm:flex-row justify-between w-full py-2'>
            <h1 className='capitalize text-xl sm:text-3xl mb-3 pl-0 sm:pl-5 text-left'>My orders</h1>
            <div className='flex gap-1'>
                
            <OrderFilterBy></OrderFilterBy>
            <OrderSortBy></OrderSortBy>
            </div>
        </div>
        
        <div className='text-xs min-[500px]:text-sm sm:text-base grid-cols-5 grid sm:grid-cols-6 md:grid-cols-7 border-black border-y-[1px]  sm:px-2 py-3 sm:py-4 w-full font-semibold'>
            <span className='capitalize w-full flex justify-center items-center'>Order Id</span>
            <span className='capitalize w-full col-span-2 flex justify-center items-center '>Estimated delivery</span>
            <span className='hidden md:flex capitalize w-full  justify-center items-center'>Customer name</span>
            <span className='hidden capitalize w-full sm:flex justify-center items-center'>No. of Pizza</span>
            <span className='capitalize w-full flex justify-center items-center'>Total price</span>
            <span className='capitalize w-full flex justify-center items-center'>view details</span>
        </div>
        
        <div className='text-xs min-[500px]:text-sm sm:text-base flex flex-col justify-start items-center !w-full gap-3 overflow-y-scroll custom-scroll'>
            
        {
            sortedOrders&&sortedOrders.map((order)=>(
                
                <ul className='grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 rounded-md !w-full border-b-[1px] border-gray-300 py-1' key={order.id}>
            
            <span className='capitalize w-full flex justify-center items-center'>{order.id}</span>
            <span className='capitalize w-full col-span-2 flex justify-center items-center '>{new Date(order.estimatedDelivery).toLocaleString()}</span>
            <span className='hidden md:flex capitalize w-full justify-center items-center '>{order.customer}</span>
            <span className='capitalize w-full hidden sm:flex justify-center items-center '>{order.cart.length}</span>
            <span className='capitalize w-full flex justify-center items-center'>{order.orderPrice}</span>
            <button className='capitalize w-full text-blue-600 flex justify-center items-center' onClick={(e)=>{e.preventDefault();handleClick(order.id);}}>view details</button>
        </ul>
                
                ))
            }
            </div>
    </div>
    </div>
  )
}


