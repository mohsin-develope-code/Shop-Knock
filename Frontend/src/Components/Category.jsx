import Button from './Button'
import { Link } from 'react-router-dom'

const Category = () => {
  return (
    <div className='h-screen w-full my-20 flex px-10'>

            <div className='h-[600px] flex-1 relative p-5'>
                <img className='h-full object-cover rounded-xl' src="src/assets/123.jfif" />

                <div className='absolute z-20 top-[50%] left-[17%] '>
                    <div className='flex flex-col items-center gap-8'>
                    <p className='font-bold text-white text-4xl'>Smoothy Coats</p>
                    <Link to={`/products/coats`}><Button btnValue={"Shop Now"}/></Link>
                    </div>
                </div>
            </div>




            <div className='h-[600px] flex-1 relative p-5'>
                <img className='h-full object-cover rounded-xl' src="src/assets/product1.jpg" />

                <div className='absolute z-20 top-[50%] left-[25%] '>
                    <div className='flex flex-col items-center gap-8'>
                    <p className='font-bold text-white text-3xl'>Smoothy Pants</p>
                    <Link to={`/products/women-pants`}><Button btnValue={"Shop Now"}/></Link>
                    </div>
                </div>
            </div>


            <div className='h-[600px] flex-1 relative p-5'>
                <img className='h-full object-cover rounded-xl' src="src/assets/123.jfif" />

                <div className='absolute z-20 top-[50%] left-[17%] '>
                    <div className='flex flex-col items-center gap-8'>
                    <p className='font-bold text-white text-4xl'>Smoothy T-Shirt</p>
                    <Link to={`/products/women-tshirt`}><Button btnValue={"Shop Now"}/></Link>
                    </div>
                </div>
            </div>


            
        </div>


   
  )
}

export default Category