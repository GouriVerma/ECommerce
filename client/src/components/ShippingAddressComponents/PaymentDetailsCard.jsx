import React from 'react'

const PaymentDetailsCard = ({numberOfProducts,orderInfo}) => {
  return (
    <div>
        <h2 className='sm:text-2xl text-xl font-xpoppins'>Price Details   ({numberOfProducts} items)</h2>
        <div className='flex flex-col space-y-4 flex-1 mt-8'>
            
            {/* Details */}
            <div className='flex justify-between items-center font-xlato'>
                <h3 className='text-gray-500 lg:text-lg'>Total MRP</h3>
                <h3 className='lg:text-lg font-sans'>₹{orderInfo.totalMRP}</h3>
            </div>
            <div className='flex justify-between items-center font-xlato'>
                <h3 className='text-gray-500 lg:text-lg'>Discount on MRP</h3>
                <h3 className='lg:text-lg font-sans text-green-600'>-₹{orderInfo.discountOnMRP}</h3>
            </div>
            <div className='flex justify-between items-center font-xlato'>
                <h3 className='text-gray-500 lg:text-lg'>Shipping Fee</h3>
                
                    {orderInfo.totalAmount>1000?
                    <h3 className='lg:text-lg font-sans'>
                    <span className='line-through'>₹100</span><span className=' text-green-600 ml-2'>FREE</span>
                    </h3>
                    :
                    <h3 className='lg:text-lg font-sans'>
                    <span className=' text-green-600 ml-2'>{orderInfo.shippingFee}</span>
                    </h3>
                    }
            
            </div>
            <hr />
            <div className='flex justify-between items-center'>
                <h3 className='font-semibold font-xlato md:text-xl'>Total Amount</h3>
                <h3 className='lg:text-lg font-semibold'>₹{orderInfo.totalAmount}</h3>
            </div>

            
        </div>
    </div>
    
  )
}

export default PaymentDetailsCard
