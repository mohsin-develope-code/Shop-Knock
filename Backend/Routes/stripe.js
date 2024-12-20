const express = require("express");
const { checkAuth } = require("../Middleware/checkAuth");
const router = express.Router();
const stripe = require('stripe')(process.env.Secret_Key)




router.post("/payment", checkAuth, async (req, res) => {


    const {products} = req.body;

    const lineItems = products.map((product) => ({
          price_data: {
            currency: "usd",
            product_data: {
                name: product.title,
            },
            unit_amount: Math.round(product.price*100),
          },
          quantity: product.quantity
    }))


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/fail",  
    })

    res.json({id: session.id})
    
    
});


















module.exports = router;