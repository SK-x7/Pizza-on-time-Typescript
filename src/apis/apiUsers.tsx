// import { createClient, PostgrestError } from "@supabase/supabase-js";
import {toast} from "react-hot-toast"
import { redirect } from "react-router-dom";
import { supabase } from "./supabase";



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
    
  
    
const { data, error } = await supabase.auth.signUp({
  email: obj.email,
  password: obj.password
})



localStorage.setItem("data",JSON.stringify(data));
const user=data.user;
const session=data.session;

    
  if(!user) return;
  if(error){
    console.log(error);
    toast.error("There was an error in signing you up please try again");
    
    return;
  }
  
  
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
  const {data,error}=await supabase.auth.signInWithPassword(obj);
  if(error) {
    toast.error(error.message);
    return false;
  }
  
  if(data?.session){
      toast.success("Login successful✔️✔️");
      localStorage.setItem('supabaseSession', JSON.stringify(data.session));
      return true;
  }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut()
  if(error) {
    toast.error(error.message);
    
    return false;
  }
  
  localStorage.removeItem('supabaseSession');
  localStorage.removeItem("user_id");
  return true;
}
