import Cookies from "js-cookie";
import { publicRequest } from "../reqMethod";

//Add Cart API
export const addToCartBackend = async (item) => {
  const response = await publicRequest.post(
    "cart/additem",
    item,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

//Remove Cart API
export const removeFromCartBackend = async (productId) => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("Token is missing!");
    return;
  } else {
    console.log("Token have available");
  }
  const response = await publicRequest.delete(
    `cart/delete?productId=${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );

  return response.data;
};

export default {
  addToCartBackend,
  removeFromCartBackend,
};
