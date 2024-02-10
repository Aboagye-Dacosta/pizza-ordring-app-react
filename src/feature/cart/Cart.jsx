import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import EmptyCart from "./EmptyCart"

import { getUsername } from '../user/userSlice';
import { clearCart, getCart } from './cartSlice';


function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(getCart);
    const username = useSelector(getUsername);

    const handleClearCart = () => {
        if (confirm('Are you sure you want to clear cart')) {
            dispatch(clearCart());
        }
    };

    if(!cart.length) return <EmptyCart/>

    return (
        <div className="px-4 py-3">
            <LinkButton to="/menu">&larr; Back to menu</LinkButton>

            <h2 className="mt-7 text-xl font-semibold">
                Your cart, {username}
            </h2>

            <ul className="mt-3 divide-y divide-stone-300 border-b border-stone-300">
                {cart.map((cartItem) => (
                    <CartItem key={cartItem.pizzaId} item={cartItem} />
                ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
                <Button to="/order/new" type="primary">
                    Order pizzas
                </Button>

                <Button type="secondary" handleClick={handleClearCart}>
                    Clear cart
                </Button>
            </div>
        </div>
    );
}

export default Cart;
