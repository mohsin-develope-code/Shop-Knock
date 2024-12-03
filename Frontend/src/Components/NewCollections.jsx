import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { publicRequest } from "../reqMethod";


const NewCollections = () => {
  const [newItem, setNewItem] = useState([]);

  useEffect(() => {
    const handleNewCollection = async () => {
      const response = await publicRequest.get(
        `product/new-collection`
      );
      setNewItem(response.data);
    };
    handleNewCollection();
  }, []);

  return (
    <>
      {newItem.length > 0 ? (
        <div className="my-10 py-10 mx-20">
          <div className="text-4xl text-center font-semibold py-7">
            <span className="bg-red-600 text-white pr-2 pl-5">New</span>{" "}
            Collections
          </div>

          <div className="w-full h-full mt-10 flex flex-wrap justify-center gap-x-14 gap-y-8 ">
            {newItem?.map((item, i) => (
              <div key={i} className="border-2 rounded-xl shadow-md">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NewCollections;
