import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMdCloseCircleOutline, IoMdClose } from "react-icons/io";
import useAuth from '../hooks/useAuth';


const options=[
  {path:"/my-account/personal-information",linkName:"Personal Information"},
  {path:"/my-account/my-orders",linkName:"My Orders"},
  {path:"/my-account/manage-address",linkName:"Manage Address"},
  // {path:"/my-account/password-manager",linkName:"Password Manager"},
  // {path:"/my-account/payment-method",linkName:"Payment Method"},
  {path:"/my-account/logout",linkName:"Logout"},
]

const MyAccountTopBar = ({handleClose}) => {
  const {auth}=useAuth();
  const location=useLocation();
  const path=location.pathname.split("/"+auth._id)[0];

  useEffect(()=>{
    handleClose();
  },[path])

  return (
    <div className='md:hidden text-sm sm:text-base flex '>
      
      <div className='mt-10'>
        {
          options.map((option)=>(
            <Link to={option.path+'/'+auth._id} key={option.linkName} className='w-full'><button className={`w-full text-left lg:text-lg text-base border-b border-gray-300 px-3 py-3 font-xpoppins text-gray-700 ${path===option.path && 'text-white bg-slate-800'}`}>{option.linkName}</button></Link>
          ))
        }
      </div>

      {/* close button */}
      <div className='flex justify-end items-start py-3' onClick={()=>handleClose()}>
        <div className='flex justify-end flex-1'>
          <button><IoMdClose className='w-6 h-6 text-gray-500' /></button>
        </div>
      </div>  
    </div>
  )
}

export default MyAccountTopBar
