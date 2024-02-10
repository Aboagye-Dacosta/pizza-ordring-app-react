/* eslint-disable react/prop-types */
import { useDispatch,useSelector } from 'react-redux';

import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import { addItem, getItemQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
    const dispatch = useDispatch();
    const itemQuantity = useSelector(getItemQuantityById(id));
    const isInCart = itemQuantity > 0;
    const handleAddItem = () => {
        const newItem = {
            pizzaId: id,
            name,
            unitPrice,
            quantity: 1,
            totalPrice: unitPrice,
        };

        dispatch(addItem(newItem));
    };

    return (
        <li className="flex gap-4 py-2">
            <img
                src={imageUrl}
                alt={name}
                className={`w-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className="flex grow flex-col">
                <p className="font-medium ">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-semibold uppercase text-stone-500">
                            Sold out
                        </p>
                    )}

                    {isInCart && (
                        <div className='flex items-center justify-center gap-3 sm:gap-8'>
                            <UpdateItemQuantity
                                pizzaId={id}
                                currentQuantity={itemQuantity}
                            />
                            <DeleteItem pizzaId={id} />
                        </div>
                    )}
                    {!soldOut && !isInCart && (
                        <Button handleClick={handleAddItem} type={'small'}>
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
