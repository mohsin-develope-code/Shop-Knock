import React from 'react'

const Button = ({btnValue }) => {
  return (


    <div>
        <button className='px-6 py-2 rounded-lg text-white bg-black border-transparent border-2
                          text-lg hover:bg-blue-50 hover:border-2 hover:border-black
                           hover:text-black font-semibold transition duration-700 ease-in-out'>
            {btnValue}
        </button>
    </div>
  )
}

export default Button