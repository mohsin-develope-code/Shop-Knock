import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  removeFromCartAPI,
  removeFromLocalCart,
  updateCountAPI,
  updateQuantity,
} from "../Redux/cartRedux";
import MessagePop from "./MessagePop";
import greenTick from "../../src/assets/success_green_tick.png";
import { Link } from "react-router-dom";
import CartItemLoader from "../Loading/cartItemLoader";

const CartItem = () => {
  const dispatch = useDispatch();
  const { cartItems, userLoggedIn, loading } = useSelector(
    (state) => state.cart
  );

  const handleQuantity = (type, id) => {
    const item = cartItems.find((i) => i._id === id);

    if (type === "incres") {
      const newQuantity = item.quantity + 1;
      if (!userLoggedIn) {
        dispatch(updateQuantity({ id, newQuantity }));
      } else {
        dispatch(updateCountAPI({ id, newQuantity }));
      }
    } else {
      if (item.quantity > 1) {
        const newQuantity = item.quantity - 1;
        if (!userLoggedIn) {
          dispatch(updateQuantity({ id, newQuantity }));
        } else {
          dispatch(updateCountAPI({ id, newQuantity }));
        }
      }
    }
  };

  const [showPop, setShowpop] = useState(false);
  const handleRemoveCart = async (item) => {
    setShowpop(true);
    setTimeout(() => {
      setShowpop(false);
    }, 2000);

    const localId = item._id;

    if (userLoggedIn) {
      try {
        await dispatch(removeFromCartAPI(localId));
        await dispatch(fetchCartItems());
      } catch (error) {
        console.error("Error while updating the cart:", error);
      }
    } else {
      dispatch(removeFromLocalCart(localId));
    }
  };

  return (
    <>
      {loading ? (
        <CartItemLoader />
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="border-b-2 pb-4">
            <div className="w-full h-48 mt-10 flex justify-between ">
              <div className="flex gap-12">
                <Link to={`/product/${item._id}`}>
                  <div className="w-52 h-48 bg-slate-300 rounded-2xl border-[1px]">
                    <img
                      src={item.img}
                      className="w-full h-full object-scale-down rounded-2xl border-[1px] bg-white p-3"
                    />
                  </div>
                </Link>

                <div className="flex flex-col justify-between py-2">
                  <Link to={`/product/${item._id}`}>
                    {" "}
                    <p className="text-xl font-medium line-clamp-2 leading-tight">
                      {item.title}
                    </p>
                  </Link>
                  <p>
                    {" "}
                    <span className="text-gray-500">Size</span> : {item.size}
                  </p>
                  <p>
                    {" "}
                    <span className="text-gray-500">Quantity</span> :{" "}
                    {item.quantity}
                  </p>

                  <div className="flex items-center flex-shrink-0 ">
                    <div
                      onClick={() => handleQuantity("decres", item._id)}
                      className="h-7 w-7 rounded-full text-white flex items-center justify-center text-2xl cursor-pointer bg-black"
                    >
                      {" "}
                      -{" "}
                    </div>

                    <div className="py-1 flex justify-center w-9 text-xl">
                      {item.quantity}
                    </div>

                    <div
                      onClick={() => handleQuantity("incres", item._id)}
                      className="h-7 w-7 rounded-full text-white flex items-center justify-center text-xl cursor-pointer bg-black"
                    >
                      {" "}
                      +{" "}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Quantity UI */}

              <div className="w-48 flex flex-col items-end justify-between py-4">
                <div
                  onClick={() => handleRemoveCart(item)}
                  className="h-10 w-10 bg-slate-100 rounded-lg cursor-pointer flex justify-center items-center transition-all hover:scale-105 ease-in-out"
                >
                  <RiDeleteBin6Line className="h-5 w-5" />
                </div>

                {showPop && (
                  <MessagePop
                    msgValue={"Item Removed"}
                    popImg={greenTick}
                    clrShadow={"shadow-green-300"}
                  />
                )}

                <div className="text-5xl">${item.price * item.quantity}</div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CartItem;
