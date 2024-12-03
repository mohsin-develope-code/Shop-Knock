import { useEffect } from "react";
import Button from "../Components/Button";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { publicRequest } from "../reqMethod";

const SuccessOrder = () => {
  
  useEffect(() => {
    const orderCreated = async () => {
      const orderResponse = await publicRequest.post(
        "order/create",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          withCredential: true,
        }
      );
      console.log("Your Cart Deleted", orderResponse.data);
    };

    orderCreated();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Link to={"/products/all"}>
        <div className="flex items-center gap-2 my-12 mx-20 text-base font-semibold border-2 border-black w-fit rounded-lg hover:shadow-xl cursor-pointer px-3 py-2">
          <FaArrowLeft /> <span>Continue Shopping</span>
        </div>
      </Link>

      <div className="flex flex-col gap-3 justify-center items-center">
        <img
          className="h-32 w-32 my-8"
          src="src/assets/success_green_tick.png"
          alt="Order Successfully Completed"
        />

        <h1 className="text-3xl font-bold">Thank you for ordering!</h1>

        <p>
          We appreciate your business. Your order has been successfully placed.
        </p>

        <Link to={"/order"}>
          <div className="mt-5">
            <Button btnValue={"View Order"} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SuccessOrder;
