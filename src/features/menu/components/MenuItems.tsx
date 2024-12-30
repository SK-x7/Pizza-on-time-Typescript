import UpdateItemQuantity from "../../cart/components/updateItemQuantity";
import DeleteItem from "../../cart/components/DeleteItem";
import { MenuItem } from "../menuInterfaces";
import Button from "../../../UiComponents/Button";
import {useDispatch,useSelector} from "react-redux"
import { addItem, getCurrentCartQuantityById } from "../../cart/cartSlice";
import { useUiContext } from "../../../contexts/UiContexts";
import RegularModal from "../../../UiComponents/RegularModal";
import CustomizeOrder from "./CustomizeOrder";
import { toast } from "react-hot-toast";
import { isUserAuthenticated } from "../../users/userSlice";


export interface MenuItemsProps {
  pizza: MenuItem;
  onCustomizeClick:(pizza: MenuItem) => void;
}

function MenuItems({pizza,onCustomizeClick}:MenuItemsProps) {
  
  const {isRegularModalOpen,toggleModel}=useUiContext();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  
  const dispatch =useDispatch();
  const currentQuantity = useSelector(getCurrentCartQuantityById(id));
  const isInCart=currentQuantity>0;
  
  const isLoggedIn = useSelector(isUserAuthenticated);

  // function handleAddToCart() {
  //   console.log(1);
  //   const newItem={
  //     pizzaId:id,
  //     name,
  //     quantity:1,
  //     unitPrice,
  //     ingredients,
  //     totalPrice:unitPrice*1,
  // }
  // dispatch(addItem(newItem));
  
  // }
  
  


  return (
    <li className="flex gap-4 py-2 items-center">
              {/* {isRegularModalOpen&&<RegularModal onClose={toggleModel}><CustomizeOrder id={pizza.id} allIngredients={pizza.allIngredients} ingredients={ingredients}></CustomizeOrder></RegularModal>} */}

      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500 mb-2">
          {ingredients.join(', ')}
        </p>
        <div className=" flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          
          
          {/* {isInCart&&
          } */}
          
          {/* {isInCart&&
          <div className='flex items-center gap-3 sm:gap-8'>
            <Button type="small" onClick={()=>onCustomizeClick(pizza)}>Customize</Button>
            <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}></UpdateItemQuantity>
          
          <DeleteItem pizzaId={id}></DeleteItem>
          </div>
          } */}
          
          {/* {!soldOut &&!isInCart&&
          <Button type="small" onClick={handleAddToCart}>Add to cart</Button>
          } */}
          {
           isLoggedIn===true? 
           <AddToCartButton currentQuantity={currentQuantity} isInCart={isInCart} onCustomizeClick={onCustomizeClick} pizza={pizza} soldOut={soldOut}></AddToCartButton>:<LoginFirstButton></LoginFirstButton>
          }
          
        </div>
      </div>
    </li>
  );
}


interface AddToCartProps{
  isInCart: boolean;
  pizza: MenuItem;
  onCustomizeClick:(pizza: MenuItem) => void;
  soldOut: boolean;
  currentQuantity:number
}

function AddToCartButton({isInCart,pizza,onCustomizeClick,currentQuantity}:AddToCartProps) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  function handleAddToCart() {
    console.log(1);
    const newItem={
      pizzaId:id,
      name,
      quantity:1,
      unitPrice,
      ingredients,
      totalPrice:unitPrice*1,
  }
  dispatch(addItem(newItem));
  
  }
  return <>
  {isInCart&&
    <div className='flex items-center gap-3 sm:gap-8'>
      <Button type="small" onClick={()=>onCustomizeClick(pizza)}>Customize</Button>
      <UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}></UpdateItemQuantity>
    
    <DeleteItem pizzaId={id}></DeleteItem>
    </div>
    }

    
    {!soldOut &&!isInCart&&
    <Button type="small" onClick={handleAddToCart}>Add to cart</Button>
  }
  </>
}

function LoginFirstButton() {
  return <Button type="small" onClick={()=>{toast('Please Log In First!', {
    icon: '⚠️',
  });}}>Add To Cart</Button>
}


export default MenuItems;
