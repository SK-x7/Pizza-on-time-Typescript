import { ResultType } from '@remix-run/router/dist/utils';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useUiContext } from '../../../contexts/UiContexts';
import Button from '../../../UiComponents/Button'
import { getCart, updateIngredientsOfItem } from '../../cart/cartSlice';

export default function CustomizeOrder({allIngredients,ingredients,id}:{allIngredients:string[],ingredients:string[],id:number}) {
    console.log(id);
    const {toggleModel}=useUiContext();
    const dispatch=useDispatch();
    const [addRemoveIngredients,setAddRemoveIngredients]=useState<string[]>(ingredients);
    function handleSubmit(e:FormEvent) {
        e.preventDefault();
        console.log(addRemoveIngredients);
        if(addRemoveIngredients.length<2){
            toast.error("Atleast two ingredients must be specified");
            return;
        }
        console.log(id);
        // console.log(formdata.values);
        dispatch(updateIngredientsOfItem({id,addRemoveIngredients}));
        setAddRemoveIngredients([]);
        toggleModel();
        console.log("submiteddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    }
    
    function handleChange(e:ChangeEvent<HTMLInputElement>) {
        // e.preventDefault();
        if(!addRemoveIngredients.includes(e.target.value))
        setAddRemoveIngredients([...addRemoveIngredients,e.target.value]);
        // addRemoveIngredients.push(e.target.value);
        else {
            setAddRemoveIngredients(addRemoveIngredients.filter(ingredient => ingredient !== e.target.value));
        }
        console.log("changed",addRemoveIngredients);    
    }
    
  return (
    <div className=' max-w-screen-sm !w-60 sm:!w-80 flex flex-col h-72 sm:h-96 justify-between'>
        <h1 className='h-1/6 flex justify-center items-center text-base sm:text-lg bg-yellow-400 rounded-lg capitalize'>Customize all Ingredients</h1>
        {/* <div className='flex flex-col justify-start items-center'> */}
            {/* <h2>allIngredients</h2> */}
            <form onSubmit={handleSubmit} className='flex flex-col h-5/6 w-full gap-2 justify-between text-sm sm:text-base'>
                    <div className='overflow-y-scroll overflow-x-hidden h-[90%] w-full bg-slate-300 rounded-xl px-1 divide-y-2 mt-2'>
                {
                        
                    allIngredients.map((ingredient)=>(
                        // <input value={ingredient} type="checkbox"/>
                        
                        <div className=" flex items-center gap-5 justify-between px-2 py-1" key={ingredient}>
                        <label htmlFor="priority" className="font-medium capitalize">
                          {ingredient}
                        </label>
                        <input
                          className="h-4 w-4 accent-white yellow focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                          type="checkbox"
                          name="priority"
                          id="priority"
                          value={ingredient}
                          defaultChecked={ingredients.includes(ingredient)}
                          
                          onChange={handleChange}
                          //   onChange={(e) => setWithPriority(e.target.checked)}
                          />
                      </div>
                          
                    ))
                }
                          </div>
                          <div className='h-[10%] flex justify-end gap-1'>
                            <button className='text-xs sm:text-sm py-1 px-3 sm:px-4 bg-yellow-400 flex justify-center items-center rounded-xl' onClick={()=>{setAddRemoveIngredients([]); toggleModel();}}>Cancel</button>
                            <button className='text-xs sm:text-sm py-1 px-3 sm:px-4 bg-yellow-400 flex justify-center items-center rounded-xl' >Save</button>
                          </div>
            </form>
        </div>
    // </div>
    
  )
}
