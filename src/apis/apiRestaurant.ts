let API_URL = import.meta.env.VITE_API_URL;


import { MenuItem } from "../features/menu/menuInterfaces";



export async function getMenu():Promise<MenuItem[]>  {
  const res = await fetch(`${API_URL}/menu`); 

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data }:{data:MenuItem[]} = await res.json();
  return data;
}