// import React, { MouseEventHandler, useEffect, useState } from "react";
// import { ActionFunctionArgs, redirect, useFetcher, useNavigate } from "react-router-dom"
// import { updateOrder, updateOrderStatus } from "../../../apis/apiRestaurant";
// import Button from "../../../UiComponents/Button"
// import { finalOrderInterface } from "../../order/components/CreateOrder";
// import { o } from "../../order/components/MyOrders";
// // import { o } from "./MyOrders";

// interface UpdateOrderProps {
//     order: finalOrderInterface;
// }
// function CancelOrder({order}:UpdateOrderProps) {
//     const navigate=useNavigate();
//     async function handleClick(e:React.MouseEvent<HTMLButtonElement>) {
//         const currentTime=new Date();
//         const estimatedDeliveryTime = new Date(order.estimatedDelivery);
//         const orderCreationTime=new Date(order.created_at);
//         const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
//         const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
//         // console.log("[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*",timeRemaining);
//         if (timeRemaining > 0&&order.status==="preparing") {
//             order=await updateOrderStatus(order.id,"Cancelled");
//             return navigate(`/order/${order.id}`);
//         }
//     }
    
//     const [canCancel,setCanCancel] =useState<boolean>(false);
    
//     useEffect(() => {
//         const currentTime=new Date();
//         const estimatedDeliveryTime = new Date(order.estimatedDelivery);
//         const orderCreationTime=new Date(order.created_at);
//         const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
//         const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
//         console.log(order.status,"[]~(￣▽~(￣▽￣)~*",timeRemaining);
//         if (timeRemaining > 0&&order.status==="preparing") {
//             const timeoutId = setTimeout(() => {
//                 setCanCancel(true);  // this will trigger a re-render, disabling or hiding the button
//                 console.log("canCancel ==== ",canCancel)
//             }, timeRemaining);  
            
//             return () => clearTimeout(timeoutId);
//         }else{
//             setCanCancel(false);
//             console.log("canCancel ==== ",canCancel)
//         }
//     }, [order.estimatedDelivery]);
    
//     return (
//         <>
//         {
//          canCancel===true&&   
//             <Button type='primary' disabled={canCancel} onClick={handleClick}>Cancel Order</Button>
//         }
//         </>
//     )
// }

// export default CancelOrder


import { useEffect } from "react";
import { useUiContext } from "../../../contexts/UiContexts";
import { finalOrderInterface } from "../../order/components/CreateOrder";

interface UpdateOrderProps {
  order: finalOrderInterface;
}

function CancelOrder({ order }: UpdateOrderProps) {
  const {canCancel, setCanCancel,setEditAction,setSelectedEditOrder,setIsRegularModalOpen} = useUiContext();

  useEffect(() => {
    const currentTime = new Date();
    const estimatedDeliveryTime = new Date(order.estimatedDelivery);
    const orderCreationTime = new Date(order.created_at);

    // Calculate the half-time interval
    const halfTimeInterval = new Date(
      orderCreationTime.getTime() +
        (estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2
    );

    const timeRemaining = halfTimeInterval.getTime() - currentTime.getTime();

    if (timeRemaining > 0 && order.status === "preparing") {
      // Allow cancellation before the half-time mark
      setCanCancel(true);

      // Schedule state change to disable cancellation after the half-time interval
      const timeoutId = setTimeout(() => {
        setCanCancel(false);
      }, timeRemaining);
 
      return () => clearTimeout(timeoutId);
    } else {
      // Disable cancellation if timeRemaining is less than or equal to 0
      setCanCancel(false);
    }
  }, [order.estimatedDelivery, order.status,order.created_at,setCanCancel]);

  async function handleClick() {
    if (canCancel) {
      setEditAction('cancel');
      setSelectedEditOrder(order.id);
      setIsRegularModalOpen(true);
      // await updateOrderStatus(order.id, "cancelled");
      // navigate(`/order/${order.id}`);
    }
    //   setEditAction(null);
    // setSelectedEditOrder(null);
    // }
  }

  // Only show the button when cancellation is allowed
  if (!canCancel||!order) return null;

  return (
    <button className="bg-yellow-400 flex justify-center items-center text-sm py-1 px-4 rounded-lg min-[425px]:text-base md:text-lg md:px-6   text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed" disabled={!canCancel} onClick={handleClick}>
      Cancel Order
    </button>
  );
}

export default CancelOrder;
