import { useEffect, useState } from "react";
import Button from "../Components/Button";
import CartItem from "../Components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../Redux/cartRedux";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import MessagePop from "../Components/MessagePop";
import redCross from "../../src/assets/cross.avif";
import { publicRequest } from "../reqMethod";


const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, total, userLoggedIn } = useSelector((state) => state.cart);
  const Total = total - 40;

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(fetchCartItems());
    }
  }, []);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51QNgc6BlMYYPhOH4JeH8gzzocZZMI0zn56mhEKE3mc9Fen80bxoM4d2l4EEnrLWq3KmKfekBs5xU54LM4hjN5bX400iz1Ro6ye"
    );

    const response = await publicRequest.post("payment",
      { products: cartItems },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true,
      }
    );

    const session = response.data;
    console.log(session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(error);
    }
  };

  const [showPop, setShowPop] = useState(false);

  const showLoginMsg = () => {
    setShowPop(true);
    setTimeout(() => {
      setShowPop(false);
    }, 3000);
  };

  return (
    <>
      {showPop && (
        <MessagePop
          msgValue={"Please Login for order"}
          popImg={redCross}
          clrShadow={"shadow-red-300"}
        />
      )}
      <div className="px-16 my-10">
        {cartItems.length > 0 ? (
          <>
            <div className="flex justify-between items-center">
              <div>
                {" "}
                <Button btnValue={"Continue Shopping"} />{" "}
              </div>
              <div>Your Wishlist</div>
              <div>
                {" "}
                <Button btnValue={"Checkout Now"} />{" "}
              </div>
            </div>

            <div className="flex justify-between my-10">
              <div className="flex flex-col w-2/3">
                <CartItem />
              </div>

              <div className="border-2 border-gray-200 w-[320px] h-[350px] text-center px-7 py-6 rounded-xl flex flex-col gap-8">
                <h1 className="text-3xl font-semibold">Order Summary</h1>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm">Subtotal</h3>
                    <p>$ {total}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm">Estimated Shipping</h3>
                    <p>+$10</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm">Shopping Discount</h3>
                    <p>-$50</p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">TOTAL</h3>
                  <p>${Total}</p>
                </div>

                {/* Stripe Payment Implement */}

                <div onClick={userLoggedIn ? makePayment : showLoginMsg}>
                  <Button btnValue={"CHECKOUT NOW"} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-10 justify-center items-center">
            <h1 className="text-4xl font-bold my-6">Your Cart Is Empty</h1>

            <img
              className="h-[400px] w-[400px]"
              src="src/assets/shopping.png"
              alt="No Cart Items"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
