const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products', 
                required: true,      
            },
            quantity: {
                type: Number,
                default: 1,
            },
            size: {
                type: String,
                default: "S",
            },
        },
    ]



})


const CartModel = mongoose.model("carts", cartSchema)



module.exports = CartModel;