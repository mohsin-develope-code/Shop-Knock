const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    categories: {
        type: Array,
        
    },

    img: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    createdAt: { type: Date, default: Date.now },

})


const ProductModel = mongoose.model("products", productSchema)



module.exports = ProductModel;