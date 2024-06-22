import React from 'react'

const OrderSummary = ({products}) => {
  return (
    <div>
        <h2 className='sm:text-2xl text-xl font-xpoppins'>Order Summary</h2>
      <div className='flex flex-col space-y-2 mt-8'>
        {
            products.map((product)=>(
                <div className='border rounded p-3 flex-1' key={product._id}>
                    {/* order details */}
                    <div className='flex font-xlato space-x-4 '>
                        
                        {/* image section */}
                        <div className='rounded  flex flex-col items-center'>                    
                            <img src={product.image} alt="" className='w-16 h-28 object-cover' />
                        </div>

                        {/* info section */}
                        <div className='flex flex-col space-y-2'>
                            <h3 className='font-semibold'>{product.name.slice(0,25)}...</h3>
                            <h3 className='text-gray-400'>{product.brand}</h3>

                            {/* size and quantity option */}
                            <div className='flex text-sm text-gray-400 space-x-4'>
                                <p className='bg-gray-100 rounded-sm px-1'>Size: {product.size}</p>
                                <p className='bg-gray-100 rounded-sm px-1'>Qty: {product.quantity}</p>
                            </div>

                            <h3 className='font-semibold'>₹{product.newPrice}</h3>
                        </div>

                        
                    </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default OrderSummary
