import { useState } from "react";
import { Link } from "react-router-dom";
import MessagePop from "./MessagePop";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import greenTick from "../../src/assets/success_green_tick.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAPI,
  addToLocalCart,
  fetchCartItems,
} from "../Redux/cartRedux";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { userLoggedIn } = useSelector((state) => state.cart);
  const [showPop, setShowPop] = useState(false);

  const handleAddCartItem = (item) => {
    setShowPop(true);
    setTimeout(() => {
      setShowPop(false);
    }, 2000);

    const itemAPI = {
      productId: item._id,
      size: "S",
      quantity: 1,
    };

    const localItem = { ...item, size: "S", quantity: 1 };

    if (userLoggedIn) {
      dispatch(addToCartAPI(itemAPI));
      dispatch(fetchCartItems());
    } else {
      dispatch(addToLocalCart(localItem));
    }
  };

  return (
    <div>
      <div
        key={item._id}
        className="relative  h-[350px] w-[250px] lg:h-[400px] lg:w-[300px] overflow-hidden pb-4 flex flex-col justify-between gap-3 
               rounded-lg bg-white"
      >
        <div className="w-full flex justify-center">
          <Link to={`/product/${item._id}`}>
            <div className="w-[200px] h-[170px] lg:w-[250px] lg:h-[200px] text-center flex justify-center items-center mt-5">
              <img className="h-full w-full object-contain" src={item.img} />
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-3 mx-7">
          <Link to={`/product/${item._id}`}>
            <p className="text-base lg:text-lg font-semibold line-clamp-1">{item.title}</p>
          </Link>
          <p className="text-red-500 text-lg lg:text-xl font-medium">
            Price ${item.price}
          </p>

          <button
            onClick={() => handleAddCartItem(item)}
            className="px-4 py-2 lg:px-5 lg:py-3 font-semibold bg-skin
        rounded-lg flex items-start justify-center gap-4
        transition ease-in-out hover:scale-105"
          >
            <HiOutlineShoppingBag className="text-black text-xl" />
            <span>Add To Cart</span>
          </button>

          {showPop && (
            <MessagePop
              msgValue={"Item Added"}
              popImg={greenTick}
              clrShadow={"shadow"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
