import {useLoaderData} from "react-router-dom"
import { getMenuFromSupabase } from "../../../apis/apiRestaurant"
import { useUiContext } from "../../../contexts/UiContexts";
import RegularModal from "../../../UiComponents/RegularModal";
import Login from "../../users/LogIn";
import { MenuItem } from "../menuInterfaces.js";
import CustomizeOrder from "./CustomizeOrder";
import MenuItems from "./MenuItems.js";




export default function Menu() {
    const {isRegularModalOpen,toggleModel}=useUiContext();
  
    const menu = useLoaderData() as MenuItem[];  //the data we fetched from our api before moving  to this route
    return (
      <div className="w-full flex justify-center items-center">
        {/* {isRegularModalOpen&&<RegularModal onClose={toggleModel}><CustomizeOrder ingredients={menu[0].allIngredients}></CustomizeOrder></RegularModal>} */}
      <ul className="divide-y divide-stone-200 px-2  w-3/4">
        {menu.map((pizza:MenuItem) => (
          <MenuItems pizza={pizza} key={pizza.id} />
          ))}
      </ul>
          </div>
    );
}

export async function fetchMenuFromApi() {
    const menu=await getMenuFromSupabase();
    return menu;
}
