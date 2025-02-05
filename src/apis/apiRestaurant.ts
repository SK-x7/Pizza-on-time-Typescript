const API_URL = import.meta.env.VITE_API_URL!;



import bcrypt from "bcryptjs";
import { toast } from "react-hot-toast";
import { clearCart } from "../features/cart/cartSlice";
import { itemInCart } from "../features/cart/components/CartItem";
import { MenuItem } from "../features/menu/menuInterfaces";
import { newOrderInterface } from "../features/order/components/CreateOrder";
import store from "../store";
import { supabase } from "./supabase";
// import { supabase } from "./apiUsers";





// export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)





export async function getMenuFromSupabase():Promise<MenuItem[]|void> {
  const { data, error } = await supabase
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
  const{data:orders,error}= await supabase.from("order").select('*').eq("userId",id);
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

export async function updateOrderStatus(orderId:number,status:"delivered"|"dispatched"|"cancelled"){
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

interface updateOrder{
  
  
  id?:number;
  created_at?:Date;
  // data:FormDataEntryValue;
  address?:string;
cart?:itemInCart[];
customer?:string;
orderPrice?:number;
phone?:string|number;
position?:string;
priority?:boolean;
priorityPrice?:number;
status?:string;
userId?:string;
estimatedDelivery?:Date;
}

export async function updateOrder(orderId:number, updateObj:updateOrder) {
  try {
    const {data,error}=await supabase.from("order").update(updateObj).eq("id",orderId).select("*");
    if(error){
      console.log(error);
      toast.error(error.message);
      return null;
    }
    toast.success(`Order priority updated`);
    console.log(data);
    return data[0];
    
    
  } catch (err) {
    throw Error(err+'Failed updating your order');
  }
}


export async function validateOrderPin(orderId:number,userId:string|null,pinToValidate:string) {
  if(!orderId || !pinToValidate || !userId) return null
  try {
    const {data,error}=await supabase.from("order").select("orderPin").eq("id",orderId).eq("userId",userId);
    if(error){
      console.log(error);
      toast.error(error.message);
      return null;
    }
    if(!data.length)  return false;
    // const order = data[0].orderPin;
    console.log(data[0].orderPin);
    
    // return await bcrypt.compare(data[0].orderPin, pinToValidate);
    return await bcrypt.compare(pinToValidate,data[0].orderPin);
    
    
  } catch (err) {
    console.log(err);
    throw Error('Failed updating your order');
  }
}

