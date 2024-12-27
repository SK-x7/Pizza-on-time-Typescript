import React from 'react'
import { useSearchParams } from 'react-router-dom';



const sortByValues=[
    {
        "label":"Sort by date (recent-first)",
        "value":"created_at-desc"
    },
    {
        "label":"Sort by date (earlier-first)",
        "value":"created_at-asc"
    },
    {
        "label":"Sort by amount (high-first)",
        "value":"orderPrice-desc"
    },
    {
        "label":"Sort by amount (low-first)",
        "value":"orderPrice-asc"
    },
]

export default function OrderSortBy() {
    
    const [searchParams,setSearchParams]=useSearchParams();

    
    function handleSortChangedValue(value:string) {
        searchParams.set("sortBy",value);
        setSearchParams(searchParams);
    }
  return (
    // <div>
        <select className=' bg-yellow-100 max-h-8 text-sm rounded-sm p-1' onChange={(e)=>{e.preventDefault();handleSortChangedValue(e.target.value);}}>
            {
                sortByValues&&sortByValues.map((obj)=>(
                    <option value={obj.value} key={obj.value}>{obj.label}</option>
                ))
            }
        </select>
    // </div>
    // </div>
  )
}
