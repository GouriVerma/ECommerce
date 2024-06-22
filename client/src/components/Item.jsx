import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa'; 
import Rating from 'react-rating-stars-component';

const Item = ({item}) => {
  const [addedToWishlist,setAddedToWishlist]=useState(false);

  const toggleWishList=()=>{
    setAddedToWishlist(!addedToWishlist)
  }
  return (
    <div className='rounded-lg border h-[380px] sm:max-h-[450px] max-w-72 w-full mx-auto'>
      <div className='relative h-[68%] '>
        <Link to={`/product/${item?._id}`} className='h-full'>
            {item.images && item.images[0] && <img src={item.images[0]?.url} alt="" className='mx-auto w-full h-full hover:scale-105 transition-all duration-300 object-cover xl:h-[250px] ' /> }
            
        </Link>    
        
      </div>

      <div className='py-2 xl:py-1 px-4 font-xpoppins flex flex-col gap-1'>
        <h4 className='sm:text-base text-sm font-semibold'>{item.name.slice(0,20)}...</h4>
        <div className='flex gap-4 items-center'>
            <p className='text-sm font-semibold text-gray-300'>{item.brand}</p>
            <p className='text-sm flex items-center gap-1 font-xlato'><FaStar className='text-yellow-400' />{item.avgRating}</p>
            
        </div>
        <div className='flex justify-between items-end'>
          <p className='font-xpoppins font-[550] text-gray-800'>₹ {item.newPrice}</p>
          {item.stock==0 &&
            <p className='font-xpoppins text-sm font-semibold text-red-500'>Out of Stock</p>
          }
        </div>
        
        
      </div>
    </div>
  )
}

export default Item
