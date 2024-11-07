let API_URL = import.meta.env.VITE_API_URL;
let SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
let SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_APIKEY;


import { MenuItem } from "../features/menu/menuInterfaces";
import { newOrderInterface } from "../features/order/components/CreateOrder";
import { createClient } from '@supabase/supabase-js'
import { useSelector } from "react-redux";
import { clearCart, getTotalCartPrice } from "../features/cart/cartSlice";
import { getUserId } from "../features/users/userSlice";
import { getEstimatedDeliveryTime } from "../utils/helpers";
import { toast } from "react-hot-toast";
import store from "../store";
import { Navigate, redirect } from "react-router-dom";





export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)





export async function getMenuFromSupabase():Promise<MenuItem[]|void> {
  let { data, error } = await supabase
  .from('menu')
  .select('*');
  if(error){
    alert(error.message);
    return;
  }
  
  if(!data){
    alert("There is no data to display");
    return;
  }
  
  return data as MenuItem[];
}
  


export async function getMenu():Promise<MenuItem[]>  {
  const res = await fetch(`${API_URL}/menu`); 

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data }:{data:MenuItem[]} = await res.json();
  return data;
}

export async function getOrder(id:string) {
  const {data,error} = await supabase.from("order").select().eq('id',id);
  if(error){
    toast.error(`Could not find order of orderId : ${id}`);
    return window.location.href="/menu";
  }
  
  if(data.length){
    console.log(data);
  }
  
  return data[0];
}


export async function fetchOrders(id:string) {
  let{data:orders,error}= await supabase.from("order").select('*').eq("userId",id);
  if(error){
    toast.error(`Could not find orders`);
    console.log(error);
    return;
  }
  return orders;
}

export async function createOrder(obj:newOrderInterface,totalCartPrice:number) {
  console.log(typeof obj.priority,obj.priority);
  const temp:newOrderInterface={
    ...obj,
    orderPrice:obj.priority?Math.round(totalCartPrice+(totalCartPrice*0.2)):totalCartPrice,
    priorityPrice:obj.priority?Math.round(totalCartPrice*0.2):0
  }
  console.log(obj);
  console.log(temp,"(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)");
  try {
    const { data, error } = await supabase
  .from('order')
  .insert([
    temp
  ])
  .select()
  if(error){
    toast.error(error.message);
    return;
  }
  
  if(data){
    const newOrder=data.length&&data[0];
    console.log(newOrder,"🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉");
    store.dispatch(clearCart());
    console.log(newOrder.id);
    // return ;
    return window.location.href=`/order/${newOrder.id}`;
  }
  

    
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrderStatus(orderId:number,status:"Delivered"|"Dispatched"|"Cancelled" ){
  const {data,error}=await supabase
  .from('order')
  .update({ status: status })
  .eq('id', orderId).select("*");
  if(error){
    toast.error(error.message);
    console.log(error.message);
    return null;
  }
  toast.success(`Order status updated to : ${status}`);
  console.log(data);
  return data[0];
  
  
}



export async function updateOrder(id:string, updateObj:{priority:boolean}) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}