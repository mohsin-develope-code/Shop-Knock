const express = require("express");
const router = express.Router();
const {handleSearchProduct, handleGetPaginateProduct, handleCategoryProduct, handleNewCollectionProduct, handleSingleProduct } = require("../Controller/productController");




//  Get Products with pagination

router.get("/", handleGetPaginateProduct)


// Get All Products and Category Products

router.get("/category", handleCategoryProduct);


// Get Search Products only

router.get("/search", handleSearchProduct);





// Get New Products

router.get("/new-collection", handleNewCollectionProduct);




//  Get only Single Product

router.get("/find/:id", handleSingleProduct);




module.exports = router;
