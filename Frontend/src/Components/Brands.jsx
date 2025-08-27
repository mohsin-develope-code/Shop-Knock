import apple from '../assets/logo/apple.png'
import lenovo from '../assets/logo/lenovo.png'
import oneplus from '../assets/logo/oneplus.png'
import huawei from '../assets/logo/huawei.png'
import tencent from '../assets/logo/tencent.png'

const Brands = () => {

  const brandLogo = [
   apple, 
   lenovo,
   oneplus,
   huawei,
   tencent,
   lenovo
  ];

  return (

    <div className="h-20 w-full px-16 my-6 ">
     <div className='h-full w-full bg-gray-100 rounded-md shadow-lg'>

       <div className=" h-full w-full flex items-center justify-center space-x-8 md:space-x-16">

        {brandLogo.map((image, i) => (
          <img key={i} src={image} className="h-4 md:h-4 lg:h-6 w-fit" />
        ))}

       </div>

     </div>


    </div>
    
    // <div className="h-20 w-full px-16 my-6 ">
    //   <div className="bg-gray-100 h-full w-full rounded-xl shadow-md flex items-center justify-center space-x-16 lg:space-x-24">
    //     {brandLogo.map((image, i) => (
    //       <img key={i} src={image} className="h-4 md:h-4 lg:h-6 w-fit" />
    //     ))}
    //   </div>
    // </div>
  );
};

export default Brands;
