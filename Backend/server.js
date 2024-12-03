const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const cookieParser  = require('cookie-parser') 
require('dotenv').config();
const authRoute = require('./Routes/auth');
const userRoute = require('./Routes/user');
const productRoute = require('./Routes/product');
const cartRoute = require('./Routes/cart');
const orderRoute = require('./Routes/order');
const paymentRoute = require('./Routes/stripe');


const app = express();
const PORT = process.env.PORT || 8080;




mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.log("Not Connect Database ", err));






app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://shop-knock-fashion.onrender.com',  
  credentials: true
}));
app.use(cookieParser());







app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api', paymentRoute);







app.listen(PORT, console.log("Server Started"));
