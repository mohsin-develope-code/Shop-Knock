import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { publicRequest } from "../reqMethod";

const Order = () => {
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    const getUserOrder = async () => {
      const response = await publicRequest.get("order/get", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        withCredentials: true,
      });

      setOrderData(response.data.userOrderDetail);
    };

    getUserOrder();
  }, []);

  return (
    <>
      {orderData ? (
        <div className="h-fit w-full px-32">
          <h1 className="text-center text-3xl font-bold my-14">Your Order</h1>

          <div className="flex flex-col space-y-7 my-14">
            <div className="rounded-xl  w-full border-2 bg-white">
              <div className="flex flex-col gap-4 py-10 px-20">
                {/* Order ID and Track */}
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-semibold">Order ID: 33490128</h1>
                  <p className="px-4 py-1 bg-green-600 w-fit text-sm text-white rounded-xl">
                    Track Order
                  </p>
                </div>

                {/* Order Date and Delivery Date */}
                <div className="flex items-center gap-3 text-sm">
                  <h1>
                    <span className="text-gray-600">Order Date:</span> 23 Nov
                    2024
                  </h1>
                  <p>|</p>
                  <h1 className="text-green-700">
                    Expected Delivery: 27 Nov 2024
                  </h1>
                </div>

                <hr className="mt-2 mb-4" />

                {/* Ordered Product Detail Main */}
                <div className="flex flex-col gap-7">
                  {/* Ordered Product Detail */}

                  {orderData?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-6">
                      <div className="flex gap-6 items-center">
                        <div>
                          <img
                            src={item.img}
                            className="h-24 w-28 object-cover object-top border-2 rounded-lg"
                          />
                        </div>

                        <div className="flex flex-col gap-4">
                          <p className="text-xl font-medium">{item.title}</p>
                          <div className="flex gap-7">
                            <p className="text-base text-gray-400 ">
                              Size: {item.size}
                            </p>
                            <p className="text-gray-400 text-base">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <h1 className="text-3xl font-semibold">
                          ${item.price}
                        </h1>
                        <p className="text-white px-5 py-1 bg-red-500 rounded-2xl  text-xs">
                          {item.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="flex flex-col gap-4 pl-6">
                  <h1 className="text-xl font-semibold">Delivery Address</h1>
                  <div className="text-sm space-y-1">
                    <p>105/300 Gandhi Nagar Plot No.4</p>
                    <p>208001, Kanpur</p>
                    <p>India</p>
                    <p>Phone No. 638XXXX758</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <div className="text-4xl font-bold">No Order</div>
        </div>
      )}
    </>
  );
};

export default Order;
