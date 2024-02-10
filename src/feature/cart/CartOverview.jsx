import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utilities/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
    const totalCartPrice = useSelector(getTotalCartPrice);
    const totalCartQuantity = useSelector(getTotalCartQuantity);

    if (!totalCartQuantity) return null;

    return (
        <div className="flex items-center justify-between bg-stone-800 p-4 text-stone-200 sm:px-6">
            <p className="space-x-4 text-sm font-semibold text-stone-200 sm:space-x-6 md:text-base">
                <span>{totalCartQuantity} pizzas</span>
                <span>{formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to="/cart">Open cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;
