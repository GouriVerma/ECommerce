import React from 'react'
import Item from './Item'
import {Link} from 'react-router-dom'


const Cards = ({filteredProducts}) => {
  return (
    <div className='grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-12'>
      {/* <div className='grid 2xl:grid-cols-4 gap-16 md:grid-cols-2 grid-cols-1 mx-auto '> */}
        {filteredProducts.slice(0,4).map((item,i)=>(
          <div key={item.id} className='rounded-lg border max-h-[450px] max-w-72 mx-auto'>
            <Link to={`/product/${item.id}`}>
                <img src={item.image} alt="" className='mx-auto w-full hover:scale-105 transition-all duration-300 max-h-80 object-center' />
            </Link>

            <div className='mt-4 px-4'>
              <h4 className='text-base font-semibold mb-2'>{item.name}</h4>
              <div className='flex justify-between py-2'>
                <p className='text-black/50'>ZARA</p>
                <p className='font-semibold text-lg'>${item.new_price}</p>
              </div>
            </div>
          </div>
        ))}
      {/* </div> */}
    </div>
  )
}

export default Cards
