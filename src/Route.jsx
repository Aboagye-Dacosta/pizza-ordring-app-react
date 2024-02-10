import { useDispatch } from 'react-redux';
import { createBrowserRouter } from 'react-router-dom';

import Cart from './feature/cart/Cart';
import { clearCart } from './feature/cart/cartSlice';
import Menu, { loader as menuLoader } from './feature/menu/Menu';
import CreateOrder, {
    action as createOrderAction,
} from './feature/order/CreateOrder';
import Order, { loader as orderLoader } from './feature/order/Order';
import { action as updateOrderAction } from './feature/order/UpdateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import Home from './ui/Home';

export const Router = () => {
    const dispatch = useDispatch();
    return createBrowserRouter([
        {
            element: <AppLayout />,
            errorElement: <Error />,
            children: [
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: 'menu',
                    element: <Menu />,
                    errorElement: <Error />,
                    loader: menuLoader,
                },
                {
                    path: 'cart',
                    element: <Cart />,
                },
                {
                    path: 'order/new',
                    element: <CreateOrder />,
                    errorElement: <Error />,
                    action: createOrderAction(() => dispatch(clearCart())),
                },
                {
                    path: 'order/:orderId',
                    element: <Order />,
                    errorElement: <Error />,
                    loader: orderLoader,
                    action: updateOrderAction,
                },
            ],
        },
    ]);
};
