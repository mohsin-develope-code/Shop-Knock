import React from 'react'

const SinglePageLoader = () => {
  return (
    <div className='px-24 py-16 bg-white animate-pulse'>


      <div className=" flex gap-16">
        <div className="h-[500px] w-[500px] flex-shrink-0 border-2 border-gray-300 p-3  bg-white">
          <img className="h-full w-full bg-slate-300 object-contain"
          />
        </div>

        <div className="flex flex-col gap-7">
          <h1 className="text-3xl font-semibold w-96 h-7 bg-slate-300 mt-3 rounded-xl"></h1>

          <p className="w-28 bg-slate-300 h-6 rounded-xl"></p>

          <p className="text-sm leading-normal w-[420px] h-6 rounded-xl mt-5 bg-slate-300">
          </p>
          <p className="text-sm leading-normal w-[420px] h-6 rounded-xl bg-slate-300">
          </p>
          <p className="text-sm leading-normal w-[420px] h-6 rounded-xl bg-slate-300">
          </p>

          <p className='w-60 h-6 bg-slate-300 mt-4 rounded-xl'>
          </p>



          <div className="flex items-center flex-shrink-0 ">
            <div
              className="h-8 w-8 p-1 rounded-full text-white flex items-center justify-center text-2xl cursor-pointer bg-slate-300"
            >
            </div>
            <div className="py-1 flex justify-center w-9 text-xl">
            </div>
            <div
              className="h-8 w-8 p-1 rounded-full text-white flex items-center justify-center text-2xl cursor-pointer bg-slate-300"
            >
            </div>
          </div>

          <button
            className="w-56 h-12 rounded-xl bg-slate-300"
          >
          </button>


      </div>
        </div> 
    </div> 
  )
}

export default SinglePageLoader