import React from "react";
import { footerData } from "../Data/data";
import subscribeImg from "../assets/woman2.png";

//motion
import { motion } from "framer-motion";
import { fadeIn } from "../Utils/framerMotion";

const Footer = () => {
  return (
    <>
      <div className="h-64 w-full bg-[#c5e9ff] flex items-center justify-center relative overflow-hidden">
        <div className="h-44 w-48 bg-blue-300 absolute z-10 top-3 -left-24 -rotate-45 flex justify-center items-center">
          <div className="h-24 w-24 bg-[#c5e9ff]"></div>
        </div>

        <div className="flex gap-1 z-20">
          <div className="h-56 w-fit">
            <img className="h-full w-fit" src={subscribeImg} alt="" />
          </div>

          <div className="flex flex-col gap-7 items-center justify-center">
            <div>
              <p className="text-3xl font-bold">
                Get <span className="text-red-500">20%</span> Off Discount
                Coupon
              </p>
              <p className="font-medium text-center mt-2">
                by Subscribe our Newsletter
              </p>
            </div>

            <motion.div
              className="flex items-center"
              variants={fadeIn("left", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <input
                type="text"
                placeholder="Email Address"
                className="w-80 h-12 px-2"
              />
              <button className="px-4 h-12 bg-black text-white">Subscribe</button>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className=" w-full h-60  bg-gray-50 
                     flex justify-center items-center"
      >
        <div className="flex gap-20 py-10 border-b-2">
          <div className="flex flex-col gap-4 flex-1 ">
            <h1 className="font-medium text-lg">About Us</h1>
            <p className="text-base text-gray-500">
              We know there are a lot of threa developers our but we pride into
              a firm{" "}
            </p>
          </div>

          {footerData.map((data) => (
            <div key={data.title} className="flex flex-col gap-4 flex-1">
              <h1 className="text-lg font-medium">{data.title}</h1>
              <ul className="text-sm space-y-3 text-gray-500">
                <li>{data.item1}</li>
                <li>{data.item2}</li>
                <li>{data.item3}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="h-10 w-full bg-gray-50 flex items-center justify-between px-28 mb-3">
        <div className="flex gap-3 text-sm">
          <p>A</p>
          <p>B</p>
          <p>C</p>
          <div>
            ©2022{" "}
            <span className="text-main-yellow font-semibold">ShopKNOCK</span>{" "}
            rights reserved
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
