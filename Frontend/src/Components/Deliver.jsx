import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaTruckFast } from "react-icons/fa6";
import { BsTrophy } from "react-icons/bs";

const Deliver = () => {
  return (
    <div className="flex justify-center py-16">
      <div className="flex items-center space-x-28">
        <div className="flex flex-col space-y-3 items-center py-5">
          <RiSecurePaymentFill className="text-5xl" />
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Secure Payment</h1>
            <p className="text-xs">100% Secure Online Payment</p>
          </div>
        </div>

        <div className="flex flex-col space-y-3 items-center py-5">
          <FaTruckFast className="text-5xl" />
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Fast Delivery</h1>
            <p className="text-xs">Get your emergency product</p>
          </div>
        </div>

        <div className="flex flex-col space-y-3 items-center py-5">
          <BsTrophy className="text-5xl" />
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-semibold">Best Quality</h1>
            <p className="text-xs">Original Product Guarenteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliver;
