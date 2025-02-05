// import { createClient, PostgrestError } from "@supabase/supabase-js";
import {toast} from "react-hot-toast"
import { redirect } from "react-router-dom";
import { supabase } from "./supabase";

// let SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL;
// let SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_APIKEY;
// export const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_KEY)

  export interface signupFormDataInterface{
    email: string;
    password: string;
    username: string;
    verifyPassword?:string;
  }
  
  export interface loginFormDataInterface{
    email: string;
    password: string;
  }

export async function signUser(obj:signupFormDataInterface) {
    
  
    
let { data, error } = await supabase.auth.signUp({
  email: obj.email,
  password: obj.password
})



console.log(data);
localStorage.setItem("data",JSON.stringify(data));
const user=data.user;
const session=data.session;

    
  if(!user) return;
  if(error){
    console.log(error);
    toast.error("There was an error in signing you up please try again");
    
    return;
  }
  console.log(user);
  
  const { data:userCreated, error:err } = await supabase
  .from('users')
  .insert([
    { user_id:user?.id,username:obj.username},
  ])
  .select()
  if(err){
    console.log(err);
    toast.error("Your signup was complete but there is an error regarding personal information",{duration: 3000});
    toast.error("You can update them later from your profile page",{duration: 3000});
    return redirect("/menu");
  } 
  
  if(userCreated){
    if (session) {
      localStorage.setItem('supabaseSession', JSON.stringify(session));
    }
  }
  return redirect("/menu");
}

export async function loginUser(obj:loginFormDataInterface) {
  let {data,error}=await supabase.auth.signInWithPassword(obj);
  if(error) {
    toast.error(error.message);
    return false;
  }
  if(data){
    console.log(data);
  }
  if(data.session){
      toast.success("Login successful✔️✔️");
      localStorage.setItem('supabaseSession', JSON.stringify(data.session));
      return true;
      return redirect("/menu");
  }
}

export async function logoutUser() {
  let { error } = await supabase.auth.signOut()
  if(error) {
    toast.error(error.message);
    
    return false;
  }
  
  localStorage.removeItem('supabaseSession');
  localStorage.removeItem("user_id");
  return true;
}
