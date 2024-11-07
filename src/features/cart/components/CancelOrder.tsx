import React, { MouseEventHandler, useEffect, useState } from "react";
import { ActionFunctionArgs, redirect, useFetcher, useNavigate } from "react-router-dom"
import { updateOrder, updateOrderStatus } from "../../../apis/apiRestaurant";
import Button from "../../../UiComponents/Button"
import { finalOrderInterface } from "../../order/components/CreateOrder";
import { o } from "../../order/components/MyOrders";
// import { o } from "./MyOrders";

interface UpdateOrderProps {
    order: finalOrderInterface;
}
function CancelOrder({order}:UpdateOrderProps) {
    const navigate=useNavigate();
    async function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
        const currentTime=new Date();
        const estimatedDeliveryTime = new Date(order.estimatedDelivery);
        const orderCreationTime=new Date(order.created_at);
        const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
        const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
        console.log("[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*",timeRemaining);
        if (timeRemaining > 0&&order.status==="preparing") {
            order=await updateOrderStatus(order.id,"Cancelled");
            return navigate(`/order/${order.id}`);
        }
    }
    
    const [canCancel,setCanCancel] =useState<boolean>(false);
    
    useEffect(() => {
        const currentTime=new Date();
        const estimatedDeliveryTime = new Date(order.estimatedDelivery);
        const orderCreationTime=new Date(order.created_at);
        const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
        const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
        console.log("[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*",timeRemaining);
        if (timeRemaining > 0&&order.status==="preparing") {
            const timeoutId = setTimeout(() => {
                setCanCancel(false);  // this will trigger a re-render, disabling or hiding the button
            }, timeRemaining);  
    
            return () => clearTimeout(timeoutId);
        }else{
            setCanCancel(true);
        }
    }, [order.estimatedDelivery]);
    
    return (
        <Button type='primary' disabled={canCancel} onClick={handleClick}>Cancel Order</Button>
    )
}

export default CancelOrder


