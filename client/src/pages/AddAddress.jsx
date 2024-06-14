import React from 'react'
import { MdAdd } from 'react-icons/md'

const AddAddress = () => {
  return (
    <div className='pt-28 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>
        <div>
            <h2 className='sm:text-xl font-semibold'>Add New Address</h2>
            <hr className='mb-4' />
            <form className='flex flex-col sm:space-y-8 space-y-4 flex-1' >
                

                {/* Name */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">Name</label>
                    <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" />
                </div>

                {/* email and phone */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">Email Address</label>
                        <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="email" />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">Phone</label>
                        <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="tel" />
                    </div>
                </div>

                {/* building info */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">House Address</label>
                    <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" placeholder='House no, Flat no, Building no' />
                </div>
                {/* area info */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">Area Address</label>
                    <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" placeholder='Street no, Colony, Society' />
                </div>

                {/* pin and city */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">Pincode</label>
                        <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">City</label>
                        <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" />
                    </div>
                </div>
                {/* state and country */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">State</label>
                        <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-600 font-xpoppins' htmlFor="">Country</label>
                        <input required className='border focus:outline-none rounded-sm px-4 py-2 w-full' type="text" />
                    </div>
                </div>

                <button className='w-full border-gray-300 rounded-sm flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins text-white bg-slate-800 hover:bg-orange-500'><MdAdd className='w-7 h-7' />Add Address</button>
            </form>
        </div>
    </div>
  )
}

export default AddAddress
