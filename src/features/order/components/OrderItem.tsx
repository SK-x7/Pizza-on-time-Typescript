import { formatCurrency } from '../../../utils/helpers';
import { itemInCart } from '../../cart/components/CartItem';

interface OrderItemProps{
    item:itemInCart;
    isLoadingIngredients:boolean;
    ingredients:string[];
}


function OrderItem({ item, isLoadingIngredients, ingredients }:OrderItemProps) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3 space-y-1">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm italic text-stone-500'>
        {isLoadingIngredients?'Loading ingredients...':ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
