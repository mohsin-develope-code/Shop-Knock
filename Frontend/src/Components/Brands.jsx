import React from "react";

const Brands = () => {
  const brandLogo = [
    "src/assets/logo/apple.png",
    "src/assets/logo/lenovo.png",
    "src/assets/logo/oneplus.png",
    "src/assets/logo/huawei.png",
    "src/assets/logo/tencent.png",
    "src/assets/logo/lenovo.png",
  ];

  return (
    <div className="h-20 w-full px-16 my-6 ">
      <div className="bg-gray-100 h-full w-full rounded-xl shadow-md flex items-center justify-center space-x-24">
        {brandLogo.map((image) => (
          <img src={image} className="h-6" />
        ))}
      </div>
    </div>
  );
};

export default Brands;
