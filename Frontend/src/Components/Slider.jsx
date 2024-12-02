import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Button from "./Button";
import { sliderItems } from "../Data/data.js";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
      console.log(slideIndex);
    } else {
      setSlideIndex(slideIndex < 3 ? slideIndex + 1 : 0);
      console.log(slideIndex);
    }
  };

  return (
    <div className="w-full h-screen flex relative overflow-hidden">
      <div
        className="bg-white z-20 absolute top-0 bottom-0 m-auto left-10  rounded-full h-10 w-10 flex justify-center 
                        items-center opacity-65 cursor-pointer hover:opacity-80"
        onClick={() => handleClick("left")}
      >
        <MdKeyboardArrowLeft className="text-5xl  " />
      </div>

      <div
        className="transition-all duration-[1500ms] ease-in-out h-full flex"
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
        slideIndex={slideIndex}
      >
        {sliderItems.map((items) => (
          <div
            key={items.id}
            className="w-screen h-screen flex items-center bg-blue-50"
          >
            <div className="h-full flex-1 justify-center items-center">
              <img src={items.img} />
            </div>

            <div className="flex-1 p-12">
              <p className="text-3xl">{items.title}</p>
              <p className="my-12 text-xl">{items.desc}</p>
              <Button btnValue={"Shop Now"} />
            </div>
          </div>
        ))}
      </div>

      <div
        className="bg-white z-20 absolute top-0 bottom-0 m-auto right-10  rounded-full h-10 w-10 flex justify-center items-center opacity-65 cursor-pointer hover:opacity-80"
        onClick={() => handleClick("right")}
      >
        <MdKeyboardArrowRight className="text-5xl  " />
      </div>
    </div>
  );
};

export default Slider;
