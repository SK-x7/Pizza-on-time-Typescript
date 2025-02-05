import { useLoaderData } from "react-router-dom";
import { getMenuFromSupabase } from "../../../apis/apiRestaurant";
import { useUiContext } from "../../../contexts/UiContexts";
import RegularModal from "../../../UiComponents/RegularModal";
import { MenuItem } from "../menuInterfaces.js";
import CustomizeOrder from "./CustomizeOrder";
import MenuItems from "./MenuItems.js";

export default function Menu() {
      const {toggleModel,setSelectedPizza,isRegularModalOpen,selectedPizza}=useUiContext();
    // const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
  
    const menu = useLoaderData() as MenuItem[];  //the data we fetched from our api before moving  to this route
    function handleOpenModal(pizza: MenuItem) {
      setSelectedPizza(pizza);
      toggleModel(); // Opens modal
    }
    return (
      
      <div className="!w-full !h-full flex justify-center items-center py-1 sm:py-2 !max-w-screen-lg mx-auto">
        {/* {isRegularModalOpen&&<RegularModal onClose={toggleModel}><CustomizeOrder ingredients={menu[0].allIngredients}></CustomizeOrder></RegularModal>} */}
        {isRegularModalOpen && selectedPizza && (
        <RegularModal onClose={() => { setSelectedPizza(null); toggleModel(); }}>
          <CustomizeOrder 
            id={selectedPizza.id} 
            allIngredients={selectedPizza.allIngredients} 
            ingredients={selectedPizza.ingredients}
          />
        </RegularModal>
      )}
      <ul className="divide-y-2 divide-stone-200 px-2  !w-full sm:w-1/2">
        
        {menu.map((pizza:MenuItem) => (
          <MenuItems pizza={pizza} key={pizza.id} onCustomizeClick={handleOpenModal}/>
          ))}
      </ul>
          </div>
          
          
          
          
    );
}

export async function fetchMenuFromApi() {
    const menu=await getMenuFromSupabase();
    return menu;
}
