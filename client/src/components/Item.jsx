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
    <div className='rounded-lg border h-[350px] sm:max-h-[450px] max-w-72 w-full mx-auto'>
      <div className='relative h-3/4 '>
        <Link to={`/product/${item?._id}`} className='h-full'>
            {item.images && item.images[0] && <img src={item.images[0]?.url} alt="" className='mx-auto w-full h-full hover:scale-105 transition-all duration-300 object-cover xl:h-[250px] ' /> }
            
        </Link>    
        <div className='absolute top-2 right-2 text-white ' onClick={toggleWishList}>
        {addedToWishlist?
        <FaHeart className='w-7 h-7 text-pink-500' /> : <FaRegHeart className='w-7 h-7' />
        }
        </div>
      </div>

      <div className='pt-2 xl:pt-1 px-4 font-xpoppins flex flex-col gap-1'>
        <h4 className='sm:text-base text-sm font-semibold'>{item.name}</h4>
        <div className='flex gap-4 items-center'>
            <p className='text-sm font-semibold text-gray-300'>{item.brand}</p>
            <p className='text-sm flex items-center gap-1 font-xlato'><FaStar className='text-yellow-400' />{item.avgRating}</p>
            
        </div>
        <div>
          <p className='font-xpoppins font-[550] text-gray-800'>₹ {item.newPrice}</p>
        </div>
      </div>
    </div>
  )
}

export default Item
