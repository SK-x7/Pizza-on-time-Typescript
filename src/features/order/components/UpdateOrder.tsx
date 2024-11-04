import { ActionFunctionArgs, useFetcher } from "react-router-dom"
import { updateOrder } from "../../../apis/apiRestaurant";
import Button from "../../../UiComponents/Button"
import { o } from "./MyOrders";
import { orderInterface } from "./Order";

interface UpdateOrderProps {
    order: o;
  }
function UpdateOrder({order}:UpdateOrderProps) {
    const fetcher =useFetcher();
    return (
        <fetcher.Form method="PATCH" className="text-right">
        <Button type='primary'>Make priority</Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

export async function action({params}:ActionFunctionArgs){
    const data={priority:true};
    await updateOrder(params.orderId as string,data);
    return null;
}
