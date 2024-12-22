import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateOrder } from "../../../apis/apiRestaurant";
import Button from "../../../UiComponents/Button";
import { finalOrderInterface } from "./CreateOrder";

interface UpdateOrderProps {
    order: finalOrderInterface;
  }
function UpdateOrder({order}:UpdateOrderProps) {
    const navigate=useNavigate();
    
    
    
    async function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
        const currentTime=new Date();
        const estimatedDeliveryTime = new Date(order.estimatedDelivery);
        const orderCreationTime=new Date(order.created_at);
        const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
        const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
        console.log("[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*",timeRemaining);
        if (timeRemaining > 0&&order.status==="preparing") {
            order=await updateOrder(order.id,{priority:true});
            return navigate(`/order/${order.id}`);
        }
    }
    
    const [canUpdate,setCanUpdate] =useState<boolean>(false);
    
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
    }, [order.estimatedDelivery]);
    
    if(!order||!canUpdate)  return null;
    
    return <Button type='primary' disabled={!canUpdate} onClick={handleClick}>Make priority</Button>
        
        
}

export default UpdateOrder


