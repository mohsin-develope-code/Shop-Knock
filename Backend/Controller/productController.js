const ProductModel = require("../Model/product");
const redisClient = require("../Utils/redisClient");


const handleGetPaginateProduct = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    // Caching Concept
    const cacheKey = `products:page:${page}:limit:${limit}`;
    const cachedProducts = await redisClient.get(cacheKey);

    if (cachedProducts) {
      console.log(`Serving page ${page} from cache`);
      return res.status(200).json(JSON.parse(cachedProducts));
    }
    //

    const [result] = await ProductModel.aggregate([
      {
        $facet: {
          products: [
            { $skip: skip }, // Skip the first (page - 1) * limit records
            { $limit: limit }, // Limit the number of records fetched
          ],
          total: [
            { $count: "count" }, // Count the total number of products
          ],
        },
      },
    ]);

    const products = result.products;
    const total = result.total[0]?.count || 0;
    const totalPages = Math.ceil(total / limit);

    const response = {
      products,
      total,
      totalPages,
      currentPage: page,
    };

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(response));
    console.log(`Set Caching page ${page}`);

    res.json({ products, total, totalPages, currentPage: page });
  } catch (error) {
    res.status(500).json({ message: "Internal Error...." });
  }
};

const handleCategoryProduct = async (req, res) => {
  const query = req.query.categories;

  try {
    if (query) {
      const categoryProduct = await ProductModel.find({
        categories: { $in: [query] },
      });
      res.status(202).json({ products: categoryProduct });
    } else {
      // Caching Concept
      const cacheKey = `products:page:${1}:limit:${5}`;
      const cachedProducts = await redisClient.get(cacheKey);

      if (cachedProducts) {
        return res.status(200).json(JSON.parse(cachedProducts));
      }
      //
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", Error: error });
  }
};

const handleNewCollectionProduct = async (req, res) => {
  try {
    const days = 7; // Default to last 7 days
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const newProducts = await ProductModel.find({
      createdAt: { $gte: cutoffDate },
    });
    res.status(200).json(newProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleSingleProduct = async (req, res) => {
  const productId = req.params.id;

  const cacheKey = `singleProduct:${productId}`;
  const cachedProducts = await redisClient.get(cacheKey);
  if (cachedProducts) {
    console.log(`Get From Cache ${cacheKey}`);
    return res.status(200).json(JSON.parse(cachedProducts));
  }

  const singleProduct = await ProductModel.findOne({ _id: req.params.id });

  await redisClient.setEx(cacheKey, 3600, JSON.stringify(singleProduct));

  console.log("Set From Cache");

  res.status(200).json(singleProduct);
};


module.exports = {
  handleGetPaginateProduct,
  handleCategoryProduct,
  handleNewCollectionProduct,
  handleSingleProduct,
};
