import React from "react";
import apple from '../assets/logo/apple.png'
import lenovo from '../assets/logo/lenovo.png'
import oneplus from '../assets/logo/oneplus.png'
import huawei from '../assets/logo/huawei.png'
import tencent from '../assets/logo/tencent.png'

const Brands = () => {

  const brandLogo = [
   apple, 
   lenovo,
   oneplus,
   huawei,
   tencent,
   lenovo
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
