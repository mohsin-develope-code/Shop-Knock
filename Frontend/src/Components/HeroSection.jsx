import { HiMiniArrowUpRight } from "react-icons/hi2";
import menHero from '../assets/men-hero.png';
import woman2 from "../assets/woman2.png"
import bag from "../assets/bag-offer.png"
import women4 from "../assets/hero-right.avif"
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <div className="max-w-full px-16 py-5">
      <div className="h-screen w-full flex space-x-4">
        <div className="w-2/3 h-full flex flex-col space-y-4 pb-6">
          <div className="h-1/2 w-full pl-24 overflow-hidden bg-green-800 rounded-3xl flex justify-between items-center">
            <div className="text-white flex flex-col items-start">
              <span className="text-xs text-yellow-200">
                Brands Also Available
              </span>
              <h1 className="text-3xl font-semibold ">Men Clothes Sale</h1>
              <p>
                <span className="text-xl">50%</span> Off every two mens wear
              </p>
              <Link to={'/products/all'}>
              <button className="px-5 py-2 mt-3 rounded-xl text-black font-semibold text-lg bg-white border-2 border-black">
                Buy Now
              </button>
              </Link>
            </div>

            <div className="w-1/3 h-full">
              <img
                src={menHero}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full h-1/2 flex gap-4 items-center justify-between ">
            <div className="h-full w-[70%] flex items-center rounded-3xl bg-gray-400">
              <div className="h-full w-[300px]">
                <img
                  src={woman2}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Women's Fashion </h1>
                <p className="text-lg font-medium"> Shop your perfect look</p>

                <Link to={'/products/all'}>
                <button className="px-4 py-2 flex items-center mt-5 space-x-1 rounded-xl text-white font-medium text-base bg-black ">
                  {" "}
                  <span>Shop Now</span>{" "}
                  <HiMiniArrowUpRight className="font-semibold text-xl" />{" "}
                </button>
                </Link>

              </div>
            </div>

            <div className="h-full w-[30%] rounded-3xl bg-red-500">
              <div className="relative">
                <div className="z-20 flex flex-col items-center">
                  <p className="text-xl text-white text-center pt-5 font-semibold">
                    Limited Time
                  </p>
                  <p className="text-xl text-white text-center font-semibold">
                    60% Offers
                  </p>

      
                  <button className="px-5 absolute top-24 mt-5 z-30  py-3 flex items-center space-x-3 rounded-xl text-white font-medium text-base bg-black ">
                    {" "}
                  
                    <span>14 : 12 : 29</span>{" "}
                    <HiMiniArrowUpRight className="font-semibold text-xl" />{" "}
            
                  </button>
                

                </div>
                <img
                  src={bag}
                  className="h-full w-full opacity-35 z-10 object-contain rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 h-full flex justify-center relative rounded-3xl ">
          <img
            src={women4}
            className="h-full w-full opacity-80 rounded-3xl object-cover"
          />

          <div className="absolute z-10 bottom-20 flex flex-col items-center space-y-14">
            <h1 className="text-5xl font-semibold text-white">Winter Season</h1>
            <h2 className="text-7xl font-semibold text-white ">50% Off</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
