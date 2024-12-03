const OrderModel = require("../Model/order");
const CartModel = require("../Model/cart");

const handleOrderCreated = async (req, res) => {
  const userId = req.user.id;
  

  try {
    const userCartData = await CartModel.findOne({ userId });
    const orderDetail = await OrderModel.create({
      userId: userId,
      products: userCartData.products,
      amount: 100,
    });

    const deleteUserCart = await CartModel.findOneAndDelete({ userId });

    res
      .status(201)
      .json({
        message: "data store",
        orderDetail,
        message: "cart deleted",
        deleteUserCart,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
};

const handleGetOrderDetail = async (req, res) => {
  const userId = req.user.id;

  try {
    const userOrder = await OrderModel.findOne({ userId }).populate(
      "products.productId",
      "title img price"
    );

    const userOrderDetail = userOrder.products.map((product) => {
      return {
        _id: product.productId._id,
        title: product.productId.title,
        price: product.productId.price,
        img: product.productId.img,
        quantity: product.quantity,
        size: product.size,
        amount: product.amount,
        status: userOrder.status,
      };
    });

    res.status(200).json({ userOrderDetail });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
};

const handleDeleteOrder = async (req, res) => {
  try {
    const deletedOrder = await OrderModel.findOneAndDelete({
      userId: req.params.userId,
    });

    res
      .status(200)
      .json({ message: "This user deleted from database", deletedOrder });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  handleOrderCreated,
  handleGetOrderDetail,
  handleDeleteOrder,
};
