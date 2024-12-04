import React, { useState, useEffect } from "react";
import Product from "../Components/Product";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [filters, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (e) => {
    const { checked, value } = e.target;
    const newOrder = checked ? value : "";
    setSortOrder(newOrder);
  };

  const handleFilter = (e) => {
    const { checked, value } = e.target;
    const filterValue = checked ? value : "";
    setFilter(filterValue);
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="w-full flex gap-5  bg-gray-100">
      <div className="h-[550px] w-64 flex-shrink-0 bg-white ml-16 my-7 px-5 flex flex-col gap-3">
        <div>
          <h1 className="text-lg text-center font-medium my-4 px-3 py-1 text-white bg-red-600 w-full">
            Filter Products
          </h1>
        </div>

        <div className=" flex gap-3">
          <p>Price Increase</p>
          <input
            onClick={(e) => handleSort(e)}
            type="checkbox"
            name="ascending"
            value="asc"
          />
        </div>

        <div className="flex gap-3">
          <p>Price Decrease</p>
          <input
            onClick={(e) => handleSort(e)}
            type="checkbox"
            name="descending"
            value="dsc"
            id=""
          />
        </div>

        <div className="flex gap-3">
          <p>Sort A to Z</p>
          <input
            onClick={(e) => handleSort(e)}
            type="checkbox"
            name="sortAtoZ"
            value="sortAlpha"
          />
        </div>

        <div className="flex gap-3">
          <p>Men</p>
          <input
            onClick={(e) => handleFilter(e)}
            type="checkbox"
            name="Men"
            value="Men"
          />
        </div>

        <div className="flex gap-3">
          <p>Women</p>
          <input
            onClick={(e) => handleFilter(e)}
            type="checkbox"
            name="Women"
            value="Women"
          />
        </div>
      </div>

      <div className="w-full">
        <Product filters={filters} sortOrder={sortOrder} loading={loading} />
      </div>
    </div>
  );
};

export default Products;
