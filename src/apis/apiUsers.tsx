import { createClient } from "@supabase/supabase-js";
import {toast} from "react-hot-toast"
import { redirect } from "react-router-dom";

let SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
let SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_APIKEY;
export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

  export interface signupFormDataInterface{
    email: string;
    password: string;
    username: string;
    verifyPassword?:string;
  }

export async function signUser(obj:signupFormDataInterface) {
    
    const { data, error } = await supabase
    .from('users')
    .insert([
      obj
    ])
    .select()
  if(!data) return;
  if(error){
    console.log(error)
    // toast.error(error.message);
    return;
  }
  console.log(data);
  return redirect("/menu");
  
  
}
