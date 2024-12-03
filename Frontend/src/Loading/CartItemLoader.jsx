

const CartItemLoader = () => {
  return (
    <div>
      {Array.from({ length: 3 }, (_, i) => (
        <>
          <div key={i} className="border-b-2 pb-4 ">
            <div className="w-full h-48 mt-10 flex justify-between ">
              <div className="flex gap-12">
                <div className="w-52 h-48 bg-slate-300 rounded-2xl shadow-md animate-pulse"></div>

                <div className="flex flex-col justify-between py-2">
                  {" "}
                  <p className="w-64 h-6 bg-slate-300 rounded-xl shadow-md animate-pulse"></p>
                  <p className="bg-slate-300 w-20 h-6 rounded-xl shadow-md animate-pulse">
                    {" "}
                    <span></span>
                  </p>
                  <p className="bg-slate-300 w-20 h-6 rounded-xl shadow-md animate-pulse">
                    {" "}
                    <span></span>{" "}
                  </p>
                  <div className="flex items-center flex-shrink-0 ">
                    <div className="h-7 w-20 shadow-md animate-pulse rounded-xl bg-slate-300"></div>
                  </div>
                </div>
              </div>

              {/* Product Quantity UI */}

              <div className="flex flex-col items-end justify-between py-4">
                <div className="h-10 w-10 bg-slate-300  shadow-md animate-pulse rounded-lg "></div>

                <div className=" bg-slate-300 rounded-md w-20 h-10 shadow-md animate-pulse">
                  {"  "}
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default CartItemLoader;
