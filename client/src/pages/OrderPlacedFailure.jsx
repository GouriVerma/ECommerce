import React from 'react'
import { TiTick } from "react-icons/ti";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaX } from 'react-icons/fa6';

const OrderPlacedFailure = () => {
    const {auth}=useAuth();
    const navigate=useNavigate();
  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4 h-[80vh] flex items-center justify-center'>
      <div className='border p-4 rounded shadow-2xl w-3/4 h-1/2 flex flex-col items-center justify-between'>
        <div className='flex flex-col items-center space-y-8 mt-8'>
            <FaX className='bg-red-800 text-white w-12 h-12 rounded-full' />
            <h2 className='font-xpoppins text-xl'>Failed to place order</h2>
        </div>
        <div className='font-semibold font-xpoppins'>
            
        </div>
        <button
        onClick={()=>navigate(`/cart/${auth._id}`)}
         className='w-full border-gray-300 rounded flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins text-white bg-slate-800 hover:bg-orange-500'>Retry</button>
    
      </div>
    </div>
  )
}

export default OrderPlacedFailure
