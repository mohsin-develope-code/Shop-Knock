import axios from "axios";
import { getCartFromLocalStorage } from "./LocalStorageCart";
import { syncCart } from "../Redux/cartRedux";
import Cookies from "js-cookie";
import { publicRequest } from "../reqMethod";

// API call when user login and user already take cart items in localStorage
export const syncLocalCartToDatabase = async (dispatch) => {
  const localCart = getCartFromLocalStorage();
  const formateLocalCart = localCart.map((item) => ({
    productId: item._id,
    quantity: item.quantity,
    size: item.size,
  }));

  if (formateLocalCart.length > 0) {
    const response = await publicRequest.post('cart/create-cart',
      { cartItems: formateLocalCart },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true,
      }
    );

    dispatch(syncCart(response.data));
    localStorage.removeItem("Local Cart");
  } else {
    return;
  }
};
