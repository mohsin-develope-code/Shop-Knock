import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { fetchCartItems, setUserLoggedIn } from "../Redux/cartRedux";
import { syncLocalCartToDatabase } from "../Utils/syncCartAPI";
import { publicRequest } from "../reqMethod";
import sideLoginImg from "../assets/bg-login.png"


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      return setError("Please Fill all fields")
    }

    const userData = {
      email,
      password,
    };

    const response = await publicRequest.post("login",
      userData,
      {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
      }
    );

    const { message, status, token } = response.data;

    if (status) {
      setError(message);
      Cookies.set("token", token);
      syncLocalCartToDatabase(dispatch);
      dispatch(setUserLoggedIn(true));
      dispatch(fetchCartItems());
      setTimeout(() => {
        navigate("/products/all");
      }, 1000);
    } else if (!status) {
      setError(message);
    }
  };

  return (
    <div
      className="bg-gray-100 w-full py-10 px-20 
                      flex items-center justify-between"
    >
      <div className="h-[500px] w-[600px] mr-32 hover:translate-x-52 hover:ease-in-out hover:duration-500 hover:transition-transform">
        <img src={sideLoginImg} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white w-[550px] px-16 py-14 rounded-lg"
      >
        <h1 className="text-3xl font-bold text-center mb-12 ">Log In</h1>

        <div className="flex flex-col w-full  gap-7">
          <div className="flex flex-1 flex-col gap-2">
            <label>Email Address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="examle@email.com"
              className="border-2 h-12 px-3 border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label>Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              className="border-2 h-12 px-3 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <p className="text-sm font-medium text-main-yellow my-5">
          Forgot Password
        </p>

        {error ? (
          <p className="text-sm text-red-500 text-center font-medium">
            {error}
          </p>
        ) : (
          <></>
        )}

        <button className="bg-black my-6 text-white text-base font-semibold w-full py-3">
          Log In
        </button>

        <p className="text-sm text-center ">
          Dont’t have an aceount ?
          <Link to={"/signup"} className="text-blue-500">
            {" "}
            Sign up free{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
