import { useSearchParams } from "react-router-dom";

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
    function handleSelectedFilter(value:string) {
        if(!value)  return;
        searchParams.set("status",value);
        setSearchParams(searchParams);
    }
    
    return (
    <div className="rounded-sm flex  gap-1 max-h-8 
    text-[10px] min-[375px]:text-xs sm:text-sm bg-yellow-100 p-1 sm:justify-center items-center">
        {
            filterByValues&&filterByValues.map((obj)=>(
                
                <button className={`capitalize border-black px-1 sm:px-3 py-1 rounded-md hover:bg-yellow-400 ${currentFilter===obj.value?"bg-yellow-400":"bg-yellow-100"}`} onClick={(e)=>{e.preventDefault();handleSelectedFilter(obj.value)}} key={obj.value}>{obj.label}</button>
            ))
        }
    </div>
  )
}
