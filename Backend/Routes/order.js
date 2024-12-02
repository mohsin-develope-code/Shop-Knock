const express = require("express");
const router = express.Router();
const { checkAuth } = require("../Middleware/checkAuth");
const {
  handleOrderCreated,
  handleGetOrderDetail,
  handleDeleteOrder,
} = require("../Controller/orderController");



router.post("/create", checkAuth, handleOrderCreated);

router.get("/get", checkAuth, handleGetOrderDetail);

router.delete("/:userId", checkAuth, handleDeleteOrder);

module.exports = router;
