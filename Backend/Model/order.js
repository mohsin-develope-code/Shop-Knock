const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            },
            size: {
                type: String
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    
    amount: {
        type: Number, 
        required: true,
    },

    status: {
        type: String, 
        default: "Pending"
    },

}, {timestamps: true})


const OrderModel = mongoose.model("orders", orderSchema)



module.exports = OrderModel;