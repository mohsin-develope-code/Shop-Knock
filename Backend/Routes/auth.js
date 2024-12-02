const express = require("express");
const { handleUserSignup, handleUserLogin, handleUserLogout } = require("../Controller/authController");
const { checkAuth } = require("../Middleware/checkAuth");

const router = express.Router();




router.post("/signup", handleUserSignup);


router.post('/login', handleUserLogin);


router.get('/logout', checkAuth , handleUserLogout)







module.exports = router;
