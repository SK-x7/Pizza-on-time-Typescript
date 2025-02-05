import { FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateOrder, updateOrderStatus, validateOrderPin } from '../../../apis/apiRestaurant';
import { useUiContext } from '../../../contexts/UiContexts';

function EditOrderModal({editAction,orderId,estimatedDelivery,created_at,status}:{editAction:string,orderId:number,estimatedDelivery:Date,created_at:Date,status:string}) {
    const {user_id,canCancel,setEditAction,setSelectedEditOrder,setIsRegularModalOpen} = useUiContext();
    const navigate = useNavigate();
    const userId = user_id || localStorage.getItem('user_id')||null; 
    if(!editAction||!orderId||!userId||!estimatedDelivery||!created_at) return null;
    
    function resetEditOrderStates(){
        setEditAction(null)
        setSelectedEditOrder(null);
        setIsRegularModalOpen(false);
    }
    
    
    
    
    async function handleSubmit(e:FormEvent) {
        //data prepraration
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formData  = new FormData(formElement);
        const pin = formData.get("orderPin") as string;
        //order pin validation
        const isPinCorrect = await validateOrderPin(orderId,userId,pin);
        console.log(isPinCorrect);
        
        //handling the order updation
        
        if(isPinCorrect===true) {
            if(await checkEditableOrNot(estimatedDelivery,created_at,status)===true){
                if(editAction==="cancel"&&canCancel===true){
                    await updateOrderStatus(orderId, "cancelled");
                    resetEditOrderStates();
                }else if(editAction==="update"){
                    await updateOrder(orderId,{priority:true});
                    resetEditOrderStates();
                }
            }else{
                toast.error("Order is already dispatched")
                toast.error("Cannot update order after dispatched");
            }
             return navigate(`/order/${orderId}`);
        }else{
            toast.error("Incorrect order pin");
            toast.error(`You cannot ${editAction} this order`);
            resetEditOrderStates();
            
            return null;
        }
    }
    
    async function checkEditableOrNot(estimatedDelivery:Date,created_at:Date,status:string) {
        const currentTime=new Date();
        const estimatedDeliveryTime = new Date(estimatedDelivery);
        const orderCreationTime=new Date(created_at);
        const halfTimeInterval = new Date(orderCreationTime.getTime()+((estimatedDeliveryTime.getTime() - orderCreationTime.getTime()) / 2));
        const timeRemaining = halfTimeInterval.getTime()-currentTime.getTime();
        console.log("[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*[]~(￣▽￣)~*",timeRemaining);
        if (timeRemaining > 0&&status==="preparing") {
            return true;
        }else{
            return false
        }
    }
    
    
    
    
  return (
    // <form className='flex flex-col gap-3 justify-start items-center max-w-64 w-64' onSubmit={(e)=>{e.preventDefault();handleSubmit(e)}}>
    <form className='flex flex-col gap-3 justify-start items-center max-w-64 w-56 sm-64' onSubmit={handleSubmit}>
            <label className='' htmlFor='orderPin'>Enter order pin you set at the time of ordering to {editAction} this order</label>
            <input type={"text"} name="orderPin" id='orderPin' className="bg-gray-200 text-sm sm:text-base py-1 px-2 w-full rounded-lg"/>
            <button className='w-full bg-yellow-400 rounded-lg py-2 capitalize text-sm sm:text-base'>{editAction} Order</button>
          </form>
  )
}

export default EditOrderModal