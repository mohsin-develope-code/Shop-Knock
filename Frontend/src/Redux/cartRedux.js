import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartBackend, removeFromCartBackend } from "./cartAPI";
import axios from "axios";
import Cookies from "js-cookie";
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../Utils/LocalStorageCart";
import { publicRequest } from "../reqMethod";


// Fetch Items API Calling
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await publicRequest.get("cart/get", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredential: true,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);


//Async Add To Cart API Calling
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (item, { rejectWithValue }) => {
    try {
      return await addToCartBackend(item);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Update Items API Calling
export const updateCountAPI = createAsyncThunk(
  "cart/updateQuantityAPI",
  async ({ id, newQuantity }) => {
    const token = Cookies.get("token");
    try {
      const response = await publicRequest.put(
        "cart/update",
        { id, newQuantity },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Authorization ": `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);



//Async Remove From Cart API Calling
export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async (productId, { rejectWithValue }) => {
    try {
      return await removeFromCartBackend(productId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialUserLoggedIn =
  JSON.parse(localStorage.getItem("LogInfo")) || false;
const initialUserCartTotal =
  JSON.parse(localStorage.getItem("Cart Total")) || 0;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: getCartFromLocalStorage() || [],
    total: initialUserCartTotal || 0,
    userLoggedIn: initialUserLoggedIn,
    loading: false,
  },

  reducers: {
    addToLocalCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i._id === item._id);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      state.total = state.cartItems.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);

      saveCartToLocalStorage(state.cartItems, state.total);
    },

    removeFromLocalCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((i) => i._id !== productId);

      state.total = state.cartItems.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);

      saveCartToLocalStorage(state.cartItems, state.total);
    },

    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;

      const existing = state.cartItems.find((i) => i._id === id);
      existing.quantity = newQuantity;

      state.total = state.cartItems.reduce((accumulator, product) => {
        return accumulator + product.price * product.quantity;
      }, 0);
      saveCartToLocalStorage(state.cartItems, state.total);
    },

    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
      if (state.userLoggedIn) {
        localStorage.setItem("LogInfo", JSON.stringify(state.userLoggedIn));
      } else {
        localStorage.removeItem("LogInfo");
      }
    },

    syncCart: (state, action) => {
      state.cartItems = action.payload;
    },

    emptyCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      //Add Cart Item
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.total = state.cartItems.reduce((accumulator, product) => {
          return accumulator + product.price * product.quantity;
        }, 0);
      })

      //Remove From Cart Item
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (product) => product._id !== action.payload
        );
        state.total = state.cartItems.reduce((accumulator, product) => {
          return accumulator + product.price * product.quantity;
        }, 0);
      })

      //Fetch Cart Item
      .addCase(fetchCartItems.pending, (state, action) => {
        state.loading = true;
      })

      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.total = state.cartItems.reduce((accumulator, product) => {
          return accumulator + product.price * product.quantity;
        }, 0);
      })

      //Update Quantity of Cart Item
      .addCase(updateCountAPI.fulfilled, (state, action) => {
        const { updatedCartItem } = action.payload;
        state.cartItems = updatedCartItem;

        state.total = state.cartItems.reduce((accumulator, product) => {
          return accumulator + product.price * product.quantity;
        }, 0);
      });
  },
});

export const {
  addToLocalCart,
  removeFromLocalCart,
  updateQuantity,
  setUserLoggedIn,
  syncCart,
  emptyCart,
} = cartSlice.actions;
export default cartSlice.reducer;
