import React from 'react'
import MyAccountSidebar from './MyAccountSidebar'

const PasswordManager = () => {
  return (
    <div className='pt-8 sm:pt-0'>
        <div>
          <div className='flex space-x-8'>
            <div className='w-1/4 lg:px-4 px-2 hidden md:flex'>
              <MyAccountSidebar activeTab={"Password Manager"} />
            </div>

            <div>
              
            </div>
          </div>
        </div>
    </div>
  )
}

export default PasswordManager
