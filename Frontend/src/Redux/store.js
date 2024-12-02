import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from './cartRedux';

export default configureStore({
    reducer: {
        cart: cartSlice,
    }
})