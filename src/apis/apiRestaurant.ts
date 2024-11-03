let API_URL = import.meta.env.VITE_API_URL;
let SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
let SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_APIKEY;


import { MenuItem } from "../features/menu/menuInterfaces";
import { newOrderInterface } from "../features/order/components/CreateOrder";
import { createClient } from '@supabase/supabase-js'
import { useSelector } from "react-redux";
import { getTotalCartPrice } from "../features/cart/cartSlice";
import { getUserId } from "../features/users/userSlice";
import { getEstimatedDeliveryTime } from "../utils/helpers";





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
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data;
}


export async function createOrder(obj:newOrderInterface) {
  const estimatedTime=getEstimatedDeliveryTime(30,60);
  const cartPrice=useSelector(getTotalCartPrice);
  const userId=useSelector(getUserId);
  const temp:newOrderInterface={
    ...obj,
    orderPrice:obj.priority?cartPrice*0.2:cartPrice,
    userId,
    estimatedDelivery:estimatedTime
  }
  console.log(obj);
  console.log(temp,"(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)(●'◡'●)");
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
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