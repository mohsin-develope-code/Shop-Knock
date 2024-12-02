import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Page/Home";
import Layout from "../Components/Layout";
import Products from "../Page/Products";
import SingleProduct from "../Page/SingleProduct";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import Cart from "../Page/Cart";
import SuccessOrder from "../Page/SuccessOrder";
import FailOrder from "../Page/FailOrder";
import Order from "../Page/Order";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="/products/:categ" element={<Products />} />

          <Route path="/product/:id" element={<SingleProduct />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/success" element={<SuccessOrder />} />

          <Route path="/fail" element={<FailOrder />} />

          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
