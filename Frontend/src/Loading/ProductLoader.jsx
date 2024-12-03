

const ProductLoader = () => {
  return (
    <>
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="relative h-[370px] w-[300px] overflow-hidden pb-4 flex flex-col justify-between gap-3 
                     animate-pulse    rounded-xl bg-white"
        >
          <div className="w-full flex justify-center">
            <div className="w-[250px] h-[170px] bg-slate-300 rounded-xl animate-pulse text-center flex justify-center items-center mt-5"></div>
          </div>

          <div className="flex flex-col gap-3 mx-7">
            <p className="w-full h-6 bg-slate-300 rounded-xl animate-pulse"></p>

            <p className="w-32 h-5 bg-slate-300 rounded-xl animate-pulse"></p>

            <p className="w-32 h-5 bg-slate-300 rounded-xl animate-pulse"></p>

            <button className="px-5 py-3 h-9 font-semibold bg-slate-300 rounded-xl flex items-start justify-center gap-4"></button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductLoader;
