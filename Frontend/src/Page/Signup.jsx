import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../reqMethod";

const Signup = () => {
  const [errMessage, setErrMessage] = useState(false);
  const naviagte = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const hanleSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPass
    ) {
      return setErrMessage("Please Fill all fields");
    }

    if (password !== confirmPass) {
      return setErrMessage("Please fill correct confim password");
    }

    const userData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    };

    try {
      const res = await publicRequest.post("signup", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = res.data;
      const { message, status } = result;

      if (status) {
        setErrMessage(message);
        setTimeout(() => {
          naviagte("/login");
        }, 2000);
      } else if (!status) {
        setErrMessage(message);
      }
    } catch (error) {
      console.log("some error show : ", error);
    }
  };

  return (
    <div className="bg-gray-100 w-full py-10">
      <form
        onSubmit={hanleSubmit}
        className="bg-white mx-auto max-w-[800px] px-14 py-16
                           flex flex-col gap-y-6 rounded-md"
      >
        <div className="text-3xl font-bold text-center mb-7 ">Sign up</div>

        <div className="flex w-full gap-14">
          <div className="flex flex-1 flex-col gap-2">
            <label>First Name</label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value), setErrMessage("");
              }}
              type="text"
              placeholder="John"
              className="border-2 h-10 px-2 border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder="Ellia"
              className="border-2 h-10 px-2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex w-full gap-14">
          <div className="flex flex-1 flex-col gap-2">
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="xyz@gmail.com"
              className="border-2 h-10 px-2 border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Phone No.</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="6355XXXXX"
              className="border-2 h-10 px-2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex w-full gap-14">
          <div className="flex flex-1 flex-col gap-2">
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              className="border-2 h-10 px-2 border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <label>Confirm Password</label>
            <input
              onChange={(e) => setConfirmPass(e.target.value)}
              type="password"
              placeholder="re-enter password"
              className="border-2 h-10 px-2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-between px-2 text-sm">
          <div className="flex gap-3 ">
            <input type="checkbox" />
            <p className="text-sm">I agree alltarm and conditionin BigShop.</p>
          </div>
        </div>

        {errMessage ? (
          <div className="text-sm text-center text-red-600 mt-10">
            {errMessage}
          </div>
        ) : (
          <></>
        )}

        <button
          className="bg-black mt-3 px-14 py-3 rounded-md text-white 
                                 font-medium mx-auto
                                 transition-transform hover:scale-110 hover:ease-in-out"
        >
          Create Account
        </button>

        <div className="mx-auto text-sm">
          Alrady have an Account?
          <Link to={"/login"} className="text-blue-600">
            {" "}
            Log In{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
