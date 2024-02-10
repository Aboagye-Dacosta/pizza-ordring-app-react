/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utilities/helpers";

function OrderItem ({ item, isLoadingIngredients, ingredients })
{
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3">
      <div className = "flex item-center justify-between text-sm gap-4 ">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-500 italic uppercase">{isLoadingIngredients ? "ingredients loading..." : ingredients?.join(", ")}</p>
    </li>
  );
}

export default OrderItem;
