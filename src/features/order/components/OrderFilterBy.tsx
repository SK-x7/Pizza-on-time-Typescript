import { useParams, useSearchParams } from "react-router-dom"

const filterByValues=[
    {
        "label":"All",
        "value":"all"
    },
    {
        "label":"Cancelled",
        "value":"cancelled"
    },
    {
        "label":"Delivered",
        "value":"delivered"
    },
]


export default function OrderFilterBy() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("status")||"all";
    console.log(currentFilter)
    function handleSelectedFilter(value:string) {
        if(!value)  return;
        searchParams.set("status",value);
        setSearchParams(searchParams);
    }
    
    return (
    <div className="rounded-sm flex  gap-1 max-h-8 text-sm bg-yellow-100 p-1 justify-center items-center">
        {
            filterByValues&&filterByValues.map((obj)=>(
                
                <button className={`capitalize border-black px-3 py-1 rounded-md hover:bg-yellow-400 ${currentFilter===obj.value?"bg-yellow-400":"bg-yellow-100"}`} onClick={(e)=>{e.preventDefault();handleSelectedFilter(obj.value)}} key={obj.value}>{obj.label}</button>
            ))
        }
    </div>
  )
}
