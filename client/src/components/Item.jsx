import React from 'react'

const Item = (props) => {
  return (
    <div className='w-[300px] border rounded font-xpoppins '>
      <img src={props.image} alt="" className='w-full h-80 object-cover'/>
      <p className='my-4 mx-2 text-slate-600'>{props.name}</p>
      <div className='flex gap-5 mx-2 mb-2 items-end'>
        <div className='text-xl font-semibold text-gray-700 '>
            Rs.{props.new_price}
        </div>
        <div className='text-lg font-medium text-gray-600 line-through'>
            Rs.{props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
