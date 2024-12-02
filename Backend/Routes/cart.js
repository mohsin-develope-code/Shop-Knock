const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Middleware/checkAuth");
const {
  handleCreatesCart,
  handleAddItemToCart,
  handleFetchCartByUser,
  handleUpdateCartQuantity,
  handleCartItemDeleted,
  handleCartDeletedAfterOrder,
} = require("../Controller/cartController");




router.post("/create-cart", checkAuth, handleCreatesCart);

router.post("/additem", checkAuth, handleAddItemToCart);

router.get("/get", checkAuth, handleFetchCartByUser);

router.put("/update", checkAuth, handleUpdateCartQuantity);

router.delete("/delete", checkAuth, handleCartItemDeleted);

router.delete("/user-cart-delete", checkAuth, handleCartDeletedAfterOrder);

module.exports = router;
