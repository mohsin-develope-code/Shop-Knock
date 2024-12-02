import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductLoader from "../Loading/ProductLoader";
import { publicRequest } from "../reqMethod";

const Product = ({ filters, sortOrder, loading }) => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  //Category Filter
  useEffect(() => {
    const categoryProducts = async () => {
      const res = await publicRequest.get(
        `product/category?categories=${filters}`
      );
      setProducts(res.data.products);
    };
    categoryProducts();
  }, [filters]);

  // Sorting In Products
  useEffect(() => {
    const sortedProducts = [...products].filter(
      (product) => product && product.price !== undefined
    );

    sortedProducts.sort((a, b) => {
      if (sortOrder === "dsc") return a.price - b.price;
      if (sortOrder === "asc") return b.price - a.price;
      if (sortOrder === "sortAlpha") {
        if (a.title < b.title) return -1;
      }
      return 0;
    });

    setProducts(sortedProducts);
  }, [sortOrder]);

  // Pagination Technique Use Here...
  useEffect(() => {
    const handleNextProducts = async () => {
      try {
        const resLimitProduct = await publicRequest.get(
          `product?page=${page}`
        );
        setProducts(resLimitProduct.data.products);
        setTotalPage(resLimitProduct.data.totalPages);
      } catch (error) {
        console.log("Some Error Show", error);
      }
    };

    handleNextProducts();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap gap-x-5 gap-y-8 mt-7 mb-20">
        {loading ? (
          <ProductLoader />
        ) : (
          products?.map((item) => <ProductCard item={item} />)
        )}
      </div>

      <div className="w-full flex justify-center mb-20">
        <div className="flex items-center space-x-8">
          <button
            onClick={() => setPage(page - 1)}
            className="px-3 py-2 bg-black rounded-lg text-white "
          >
            {" "}
            Prev{" "}
          </button>
          {Array.from({ length: totalPage }, (_, i) => (
            <button className="w-10 py-2 rounded-md bg-white text-black">
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(page + 1)}
            className="px-3 py-2 bg-black rounded-lg text-white "
          >
            {" "}
            Next{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

// Previous Code

{
  /* <div className='flex flex-col justify-center'>
      {
       heroCount
       ? 
       products.map((item) => (

         <ProductCard item={item} /> 

       ))

       :

       products.slice(0,3)
               .map((item) => (

                <ProductCard item={item} /> 

       ))


      }

      <div>
        <div className='flex items-center space-x-8'>
             <button onClick={()=> setPage(page-1)}> Prev </button>
            {
              Array.from({ length: totalPage }, (_, i) => (
                <button className='px-3 py-1 bg-black text-white'>
                  {i+1}
                </button>
              ))
            }

             <button onClick={()=> setPage(page+1)}> Next </button>
            

        </div>
      </div>

    </div> */
}
