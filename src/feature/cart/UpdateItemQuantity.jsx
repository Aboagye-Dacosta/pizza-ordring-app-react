import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center justify-center gap-2 sm:gap-3">
            <Button
                type="round"
                handleClick={() => dispatch(decreaseItemQuantity(pizzaId))}
            >
                <span>&#8722;</span>
            </Button>
            <span>{currentQuantity}</span>
            <Button
                type="round"
                handleClick={() => dispatch(increaseItemQuantity(pizzaId))}
            >
                <span>&#43;</span>
            </Button>
        </div>
    );
}

export default UpdateItemQuantity;
