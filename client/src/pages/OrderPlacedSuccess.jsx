import React from 'react'
import { TiTick } from "react-icons/ti";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const OrderPlacedSuccess = () => {
    const {auth}=useAuth();
    const navigate=useNavigate();
  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4 h-[80vh] flex items-center justify-center'>
      <div className='border p-4 rounded shadow-2xl w-3/4 h-3/5 flex flex-col items-center justify-between'>
        <div className='flex flex-col items-center space-y-8 mt-8'>
            <TiTick className='bg-green-800 text-white w-12 h-12 rounded-full' />
            <div className='flex flex-col items-center'>
              <h2 className='font-xpoppins text-xl'>Order Placed Successfully</h2>
              <p>Thanks for placing order :)</p>
            </div>

        </div>
        <div className='font-semibold font-xpoppins'>
            
        </div>
        <button
        onClick={()=>navigate(`/my-account/my-orders/${auth._id}`)}
         className='w-full border-gray-300 rounded flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins text-white bg-slate-800 hover:bg-orange-500'>View Orders</button>
    
      </div>
    </div>
  )
}

export default OrderPlacedSuccess
