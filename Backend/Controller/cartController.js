const CartModel = require("../Model/cart");

const handleCreatesCart = async (req, res) => {
  const userId = req.user.id;
  const { cartItems } = req.body;

  try {
    const cartShow = await CartModel.create({
      userId: req.user.id,
      products: cartItems,
    });

    res.status(201).json(cartShow);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
};

const handleAddItemToCart = async (req, res) => {
  const { productId, quantity, size } = req.body;
  // const productId = _id;
  const userId = req.user.id;

  try {
    const findUserCart = await CartModel.findOne({ userId });
    if (findUserCart) {
      const existingItem = findUserCart.products.find(
        (item) => item.productId.toString() === productId
      );
      console.log(existingItem);
      if (!existingItem) {
        findUserCart.products.push({ productId, quantity, size });
        await findUserCart.save();
      } else {
        existingItem.quantity += quantity;
        await findUserCart.save();
      }

      res.status(200).json("user exist and update it's cart");
    } else {
      const userNewCart = await CartModel.create({
        userId,
        products: { productId, quantity, size },
      });

      return res.status(200).json({ message: "Create New User Cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error adding to cart", err });
  }
};

const handleFetchCartByUser = async (req, res) => {
  try {
    const userCart = await CartModel.findOne({ userId: req.user.id }).populate(
      "products.productId",
      "title img price"
    );

    if (userCart) {
      const cartWithProductDetails = userCart.products.map((product) => {
        return {
          _id: product.productId._id,
          title: product.productId.title,
          price: product.productId.price,
          img: product.productId.img,
          quantity: product.quantity,
          size: product.size,
        };
      });

      return res.status(200).json(cartWithProductDetails);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const handleUpdateCartQuantity = async (req, res) => {
  const { id, newQuantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId, "products.productId": id },
      { $set: { "products.$.quantity": newQuantity } },
      { new: true, runValidators: true }
    ).populate("products.productId");

    const updatedCartItem = cart.products.map((product) => ({
      ...product.productId.toObject(),
      size: product.size,
      quantity: product.quantity,
    }));

    res
      .status(200)
      .json({ message: "Yes Your Cart Qauntity Updated", updatedCartItem });
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const handleCartItemDeleted = async (req, res) => {
  const { productId } = req.query;

  try {
    const user = await CartModel.findOne({ userId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "Cart not found" });
    }

    user.products = user.products.filter(
      (item) => item.productId.toString() !== productId
    );
    await user.save();

    res.status(200).json({ message: "This user deleted from database", user });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};

const handleCartDeletedAfterOrder = async (req, res) => {
  const userId = req.user.id;

  await CartModel.findOneAndDelete({ userId });

  res.status(200).json({ message: "this user cart deleted", userId });
};




module.exports = {
  handleCreatesCart,
  handleAddItemToCart,
  handleFetchCartByUser,
  handleUpdateCartQuantity,
  handleCartItemDeleted,
  handleCartDeletedAfterOrder,
};
