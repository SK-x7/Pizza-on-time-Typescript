import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateName } from "./userSlice";

import {useDispatch} from "react-redux"

export default function CreateNewUser() {
  const dispatch = useDispatch();
    const [username, setUsername] = useState<string>('');
    const navigate=useNavigate();
    
    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        if(!username)   return;
        dispatch(updateName(username));

        navigate("/menu");
        
    }
    
    function handleNameChange(e:React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setUsername(e.target.value);
        
    }
    
    
    
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
        
        <p className="mb-4 text-sm text-stone-600 md:text-base flex justify-center items-center">👋 Welcome! Please start by telling us your name:</p>
        <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={handleNameChange}
        className="input mb-8 w-72 py-3 px-5 rounded-2xl transition-all duration-150 border-none focus:outline-none focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-4 text-stone-500 text-sm"
      />
        
        {
username&&<button disabled={!username} className="uppercase bg-yellow-400 py-3 px-8 rounded-3xl text-sm font-semibold hover:bg-yellow-300">start ordering</button>
}
    </form>
  )
}
