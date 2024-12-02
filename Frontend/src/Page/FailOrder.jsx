import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const FailOrder = () => {
  return (
    <div className="flex flex-col h-screen">
      <Link to={"/products/all"}>
        <div className="flex items-center gap-2 my-12 mx-20 text-base font-semibold border-2 border-black w-fit rounded-lg hover:shadow-xl cursor-pointer px-3 py-2">
          <FaArrowLeft /> <span>Continue Shopping</span>
        </div>
      </Link>

      <div className="flex flex-col gap-3 justify-center items-center">
        <img
          className="h-64 w-64 mb-8"
          src="src/assets/payment-fail.webp"
          alt="Order Successfully Completed"
        />

        <h1 className="text-3xl font-bold">Oop's Something is wrong!</h1>

        <p className="font-semibold text-red-600">Try Again</p>
      </div>
    </div>
  );
};

export default FailOrder;
