import { useEffect, useState, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import Button from "./Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, setUserLoggedIn } from "../Redux/cartRedux";
import { publicRequest } from "../reqMethod";


const Navbar = () => {
  const placeholders = [
    "Search for products...",
    "Search for Men Clothes...",
    "Search for Women Clothes...",
    "Find your favorite items...",
    "Discover new arrivals...",
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const placeholderRef = useRef(currentPlaceholder);
  placeholderRef.current = currentPlaceholder;

  useEffect(() => {
    let timer;

    const updatePlaceholder = () => {
      const currentText = placeholders[placeholderIndex];
      const textLength = placeholderRef.current.length;

      if (!isDeleting && textLength < currentText.length) {
        // Typing characters
        timer = setTimeout(() => {
          setCurrentPlaceholder((prev) =>
            currentText.substring(0, prev.length + 1)
          );
        }, 150);
      } else if (isDeleting && textLength > 0) {
        // Deleting characters
        timer = setTimeout(() => {
          setCurrentPlaceholder((prev) =>
            currentText.substring(0, prev.length - 1)
          );
        }, 100);
      } else if (!isDeleting && textLength === currentText.length) {
        // Pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && textLength === 0) {
        // Switch to the next placeholder
        setIsDeleting(false);
        setPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        );
      }
    };

    updatePlaceholder();
    return () => clearTimeout(timer);
  }, [isDeleting, placeholderIndex, placeholders]);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, userLoggedIn } = useSelector((state) => state.cart);
  const [dropDown, setDropDown] = useState(false);

  const Location = useLocation();
  const [active, setActive] = useState(1);

  useEffect(() => {
    if (Location.pathname === "/") {
      setActive(1);
    } else if (Location.pathname === "/products/all") {
      setActive(2);
    } else {
      setActive(false);
    }
  }, []);



  const handleLogout = async () => {
    try {
      const response = await publicRequest.get("logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        withCredentials: true,
      });

      const { status } = response.data;

      if (status) {
        dispatch(setUserLoggedIn(false));
        dispatch(emptyCart([]));
        setTimeout(() => {
          Cookies.remove("token");
          navigate("/login");
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
     {/* <div className="h-14 w-full  flex px-16 py-8 border-b-2"> */}

        {/* <div className="w-full flex items-center justify-between"> */}



        <div className="w-full border-b-2 px-10 py-2">

          <div className="flex items-center justify-between">


          <div className=" flex items-center gap-12 md:gap-20 lg:gap-28">

            <div className="text-black font-extrabold sm:text-lg md:text-xl lg:text-2xl"> 

              <span className="pl-3 pr-1 py-1 bg-red-500 font-semibold text-white">SHOP</span>

              <span className="pl-1">KNOCK</span></div>

            <div>
              <ul className="flex gap-5">

                {/* Home Button */}
                <Link to={"/"}>
                  {" "}
                  <li
                    key={1}
                    className={`font-semibold sm:text-sm lg:text-base menu-item p-2 hover:bg-slate-300 hover:scale-105 transition-colors ease-in-out hover:rounded-lg cursor-pointer "
                      ${
                        active === 1
                          ? "bg-slate-300 rounded-lg"
                          : "bg-transparent"
                      }`}
                    onClick={() => setActive(1)}
                  >
                    Home
                  </li>{" "}
                </Link>

                {/* Product Button */}
                <Link to={"/products/all"}>
                  {" "}
                  <li
                    key={2}
                    className={`font-semibold sm:text-sm lg:text-base menu-item p-2 hover:bg-slate-300 hover:scale-105 transition-colors hover:rounded-lg cursor-pointer "
                       ${
                         active === 2
                           ? "bg-slate-300 rounded-lg"
                           : "bg-transparent"
                       }`}
                    onClick={() => setActive(2)}
                  >
                    Products
                  </li>{" "}
                </Link>

              </ul>
            </div>

          </div>




         {/* Searching Bar Box */}
          <form className="gap-3 items-center hidden lg:flex">
            <input
              type="text"
              placeholder={currentPlaceholder}
              className="lg:w-80 lg:h-10 px-3 border-2 rounded-xl"
            />
          </form>



          <div className="w-fit hidden  md:flex items-center gap-12">
            {/* Shopping Cart Icon */}

              <div onClick={() => setActive(0)} className="right-3 relative md:px-6">
              <Link to={"/cart"}>
                <AiOutlineShoppingCart className="h-7 w-7 md:h-7 md:w-7 lg:h-8 lg:w-8  " />
                {cartItems.length > 0 ? (
                  <p className="absolute h-6 w-6 text-xs font-medium -top-2 right-1 flex items-center justify-center p-2 bg-black text-white rounded-full">
                    {cartItems.length}
                  </p>
                ) : (
                  <></>
                )}
                </Link>
              </div>

              <div>
              {userLoggedIn ? (
                <div
                  className="relative"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <div className="max-h-14 max-w-14 flex justify-center items-center py-1 rounded-lg  border-2 border-gray-400">
                    <CgProfile className="h-7 w-10 cursor-pointer transition-all ease-in duration-700  text-gray-400" />
                  </div>
                  {dropDown ? (
                    <div
                      className={` h-52 w-44 border-[1px] border-gray-300 bg-white absolute -right-2 top-11 rounded-lg shadow-lg
                                       flex flex-col items-center justify-center gap-5 py-1  cursor-pointer
                                       z-10`}
                    >
                      <div className="flex items-center justify-center ">
                        <CgProfile className="h-12 w-12 text-gray-400" />
                      </div>

                      <ul className=" flex flex-col items-center justify-end space-y-2">
                        <Link to={"/order"}>
                          <li className="hover:bg-gray-100 tracking-wide font-medium rounded-md cursor-pointer hover:px-7 py-[6px] hover:py-[6px] menu-item">
                            Order
                          </li>
                        </Link>
                        <li
                          onClick={handleLogout}
                          className="hover:bg-gray-100 tracking-wide font-medium rounded-md cursor-pointer hover:px-7 py-[6px] hover:py-[6px] menu-item"
                        >
                          Logout
                        </li>

                      </ul>


                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <Link to={"/login"}>
                  <Button btnValue={"Login"} />
                </Link>
              )}
              </div>

          </div>


        </div>
      </div>
    </>
  );
};

export default Navbar;
