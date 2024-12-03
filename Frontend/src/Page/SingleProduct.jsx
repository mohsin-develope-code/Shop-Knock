import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAPI,
  addToLocalCart,
  fetchCartItems,
} from "../Redux/cartRedux";
import MessagePop from "../Components/MessagePop";
import greenTick from "../../src/assets/success_green_tick.png";
import ProductCard from "../Components/ProductCard";
import { publicRequest } from "../reqMethod";

const sizeItem = ["S", "M", "L", "XL"];

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { userLoggedIn } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [active, setActive] = useState(0);
  const [itemProducts, setItemProducts] = useState();
  const [relatedProducts, setRelatedProducts] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const response = await publicRequest.get(`product/find/${id}`);
      setItemProducts(response.data);
    };
    getProduct();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (itemProducts && itemProducts.categories) {
      console.log(itemProducts.categories[0]);
      const relatedPro = async () => {
        const res = await publicRequest.get(
          `product/category?categories=${itemProducts.categories[0]}`
        );
        setRelatedProducts(res.data.products);
      };

      relatedPro();
    }
  }, [itemProducts]);

  const handleQuantity = (type) => {
    if (type === "incres") {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleActive = (index) => {
    setActive(index);
  };

  const [showPop, setShowpop] = useState(false);
  const handleAddCartItem = (itemProducts) => {
    setShowpop(true);
    setTimeout(() => {
      setShowpop(false);
    }, 2000);

    const itemAPI = {
      productId: itemProducts._id,
      size: size,
      quantity: quantity,
    };
    const localItem = { ...itemProducts, size, quantity };
    console.log(localItem);

    if (userLoggedIn) {
      dispatch(addToCartAPI(itemAPI));
      dispatch(fetchCartItems());
    } else {
      dispatch(addToLocalCart(localItem));
    }
  };

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div key={id} className="px-24 py-16 bg-white">
      <div className=" flex gap-16">
        <div className="h-[500px] w-[500px] flex-shrink-0 border-2 border-gray-300 p-3  bg-white">
          <img
            src={itemProducts?.img}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-7">
          <h1 className="text-3xl font-semibold">{itemProducts?.title}</h1>

          <p className="text-2xl text-red-500 font-medium">
            Price: ${itemProducts?.price}
          </p>

          <p className="text-sm leading-normal text-gray-600">
            {" "}
            <span className="text-black font-medium">Detail :</span>{" "}
            {itemProducts?.desc}
          </p>

          <p>
            {" "}
            <span className="font-medium">Category : </span>
            {itemProducts?.categories.map((cat, i) => (
              <span key={i} className="text-sm text-gray-700 px-1">{cat}</span>
            ))}
          </p>

          <div className="flex items-center flex-shrink-0 ">
            <div
              className="h-8 w-8 p-1 rounded-full text-white flex items-center justify-center text-2xl cursor-pointer bg-black"
              onClick={() => handleQuantity("decres")}
            >
              -
            </div>
            <div className="py-1 flex justify-center w-9 text-xl">
              {quantity}
            </div>
            <div
              className="h-8 w-8 p-1 rounded-full text-white flex items-center justify-center text-2xl cursor-pointer bg-black"
              onClick={() => handleQuantity("incres")}
            >
              +
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <div className="text-xl">Size : </div>
            {sizeItem.map((item, index) => (
              <div key={index}
                className={`border-[1px] border-black rounded-full h-8 w-8 flex justify-center items-center font-medium cursor-pointer ${
                  active === index ? "bg-gray-400" : "bg-transparent"
                }`}
                onClick={() => {
                  handleActive(index), setSize(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>

          <button
            onClick={() => handleAddCartItem(itemProducts)}
            className="px-20 py-3 mr-auto mt-5 
                    transition ease-in-out hover:scale-105
                   bg-black text-white font-semibold rounded-lg"
          >
            Add To Cart
          </button>

          {showPop && <MessagePop msgValue={"Item Added"} popImg={greenTick} />}
        </div>
      </div>

      {relatedProducts ? (
        <div className="mt-20">
          <div className="py-10 mb-8">
            <h1 className="text-3xl font-semibold ">Related Products</h1>
            <div className="w-60 h-1 my-1 bg-red-500"></div>
          </div>

          {/* Work At this Section */}
          <div className="relative flex items-center space-x-7 w-full scroll-mr-96 overflow-hidden">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto scrollbar-hide gap-4 scroll-smooth"
              style={{
                overflowX: "auto",
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For IE and Edge
              }}
            >
              {Array.isArray(relatedProducts) &&
                relatedProducts.map((item) => (
                  <div
                    className="border-2 shadow-lg rounded-3xl"
                    key={item._id}
                  >
                    <Link to={`/product/${item._id}`}>
                      <ProductCard item={item} />
                    </Link>
                  </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
              onClick={scrollLeft}
            >
              ❮
            </button>
            <button
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
              onClick={scrollRight}
            >
              ❯
            </button>

            {/* {
        relatedProducts && relatedProducts?.map((item) => (
           
            <div className='border-2 shadow-lg rounded-3xl'>
                 <Link to={`/product/${item._id}`}>
                 <ProductCard item={item}/>
                 </Link>
            </div>
        ))

    } */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleProduct;
