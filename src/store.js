import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './feature/cart/cartSlice';
import userReducer from './feature/user/userSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    },
});

export default store;
