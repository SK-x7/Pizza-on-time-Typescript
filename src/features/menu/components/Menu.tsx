import {useLoaderData} from "react-router-dom"
import { getMenu } from "../../../apis/apiRestaurant"
import { MenuItem } from "../menuInterfaces.js";
import MenuItems from "./MenuItems.js";




export default function Menu() {
    const menu = useLoaderData() as MenuItem[];  //the data we fetched from our api before moving  to this route
    return (
      <ul className="divide-y divide-stone-200 px-2">
        {menu.map((pizza:MenuItem) => (
          <MenuItems pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    );
}

export async function fetchMenuFromApi() {
    const menu=await getMenu();
    return menu;
}
