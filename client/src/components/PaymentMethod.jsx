import React from 'react'
import MyAccountSidebar from './MyAccountSidebar'

const PaymentMethod = () => {
  return (
    <div className='pt-8 sm:pt-0'>
        <div>
          <div className='flex space-x-8'>
            <div className='w-1/4 lg:px-4 px-2 hidden md:flex'>
              <MyAccountSidebar activeTab={"Payment Method"} />
            </div>

            <div>
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default PaymentMethod
