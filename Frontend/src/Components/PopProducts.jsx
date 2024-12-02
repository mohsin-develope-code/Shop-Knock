import React, { useState } from "react";
import Product from "./Product";

const PopProducts = () => {
  const slides = [
    "src/assets/banner-3.jpg",
    "src/assets/Banner-0.jpg",
    "src/assets/banner-4.jpg",
    "src/assets/banner-5.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col gap-12 justify-center items-center">
      <div className="w-full px-14 pb-24  py-8 gap-x-14 gap-y-9 justify-center flex">
        <div className="relative w-full max-w-[1100px] mx-auto overflow-hidden">
          {/* Slider Wrapper */}
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <img
                src={slide}
                className="min-w-full h-64 flex-shrink-0 object-cover"
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            onClick={handlePrev}
          >
            ❮
          </button>
          <button
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
            onClick={handleNext}
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopProducts;
