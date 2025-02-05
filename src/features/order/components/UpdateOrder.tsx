import { useEffect } from "react";
import { useUiContext } from "../../../contexts/UiContexts";
import { finalOrderInterface } from "./CreateOrder";

interface UpdateOrderProps {
    order: finalOrderInterface;
  }
function UpdateOrder({order}:UpdateOrderProps) {
    
    
    
    // async function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
    //     const currentTime=new Date();
    //     const estimatedDeliveryTime = new Date(order.estimatedDelivery);
    //     const orderCreationTime=new Date(order.created_at);
    //     const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
    //     const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
    //     console.log("[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*",timeRemaining);
    //     if (timeRemaining > 0&&order.status==="preparing") {
    //         order=await updateOrder(order.id,{priority:true});
    //         return navigate(`/order/${order.id}`);
    //     }
    // }
    
    // const [canUpdate,setCanUpdate] =useState<boolean>(false);
    const {canCancel,canUpdate,setCanUpdate,setSelectedEditOrder,setEditAction,setIsRegularModalOpen} = useUiContext();
    
    useEffect(() => {
        const currentTime=new Date();
        const estimatedDeliveryTime = new Date(order.estimatedDelivery);
        const orderCreationTime=new Date(order.created_at);
        const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
        const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
        // console.log("x==",order.status,",[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[",timeRemaining);
        
        if (timeRemaining > 0&&order.status==="preparing") {
            setCanUpdate(true);
            const timeoutId = setTimeout(() => {
                //NOTE - 
                setCanUpdate(false);  // this will trigger a re-render, disabling or hiding the button
                
            }, timeRemaining);  
    
            return () => clearTimeout(timeoutId);
        }else{
            // setCanUpdate(true);
            // NOTE - ┴
            setCanUpdate(false);
        }
    }, [order.estimatedDelivery,order.created_at,order.status,setCanUpdate]);
    
    
    async function handleClick() {
        if (canUpdate) {
          setEditAction('update');
          setSelectedEditOrder(order.id);
          setIsRegularModalOpen(true);
          
          // await updateOrderStatus(order.id, "cancelled");
          // navigate(`/order/${order.id}`);
        }
        //   setEditAction(null);
        // setSelectedEditOrder(null);
        // }
      }
    
    if(!order||!canUpdate||!canCancel)  return null;
    
    return <button className="bg-yellow-400 flex justify-center items-center text-sm py-1 px-4 rounded-lg min-[425px]:text-base md:text-lg md:px-6   text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed" disabled={!canUpdate} onClick={handleClick}>Make priority</button>
        
        
}

export default UpdateOrder


