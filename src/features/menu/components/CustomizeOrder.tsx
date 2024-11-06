import React from 'react'
import Button from '../../../UiComponents/Button'

export default function CustomizeOrder({allIngredients,ingredients}:{allIngredients:string[],ingredients:string[]}) {
  return (
    <div className=' max-w-screen-sm w-80 flex flex-col h-96 justify-between'>
        <h1 className='h-1/6 flex justify-center items-center text-lg bg-yellow-400 rounded-lg capitalize'>Customize all Ingredients</h1>
        {/* <div className='flex flex-col justify-start items-center'> */}
            {/* <h2>allIngredients</h2> */}
            <form className='flex flex-col h-5/6 w-full gap-2 justify-between'>
                    <div className='overflow-y-scroll overflow-x-hidden h-[90%] w-full bg-slate-300 rounded-xl px-1 divide-y-2 mt-2'>
                {
                        
                    allIngredients.map((ingredient)=>(
                        // <input value={ingredient} type="checkbox"/>
                        
                        <div className=" flex items-center gap-5 justify-between px-2 py-1">
                        <label htmlFor="priority" className="font-medium capitalize">
                          {ingredient}
                        </label>
                        <input
                          className="h-4 w-4 accent-white yellow focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
                          type="checkbox"
                          name="priority"
                          id="priority"
                          value={ingredient}
                          checked={ingredients.includes(ingredient)}
                          //   onChange={(e) => setWithPriority(e.target.checked)}
                          />
                      </div>
                          
                    ))
                }
                          </div>
                          <div className='h-[10%] flex justify-end'>
                            <Button type='small'>Cancel</Button>
                            <Button type='small'>Save</Button>
                          </div>
            </form>
        </div>
    // </div>
    
  )
}
