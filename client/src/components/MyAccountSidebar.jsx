import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const options=[
    {path:"/my-account/personal-information",linkName:"Personal Information"},
    {path:"/my-account/my-orders",linkName:"My Orders"},
    {path:"/my-account/manage-address",linkName:"Manage Address"},
    {path:"/my-account/password-manager",linkName:"Password Manager"},
    {path:"/my-account/payment-method",linkName:"Payment Method"},
    {path:"/my-account/logout",linkName:"Logout"},
]


const MyAccountSidebar = ({activeTab}) => {
    const {auth}=useAuth();
    const location=useLocation();
    const id=auth._id;
    
  return (
    <div className='flex flex-col space-y-4'>
      {
        options.map((option)=>(
            <Link to={option.path+'/'+id} key={option.linkName} className='w-full'><button className={`w-full text-left lg:text-lg border border-gray-300 px-3 py-3 rounded font-xpoppins text-gray-700 ${activeTab===option.linkName && 'text-white bg-slate-800'}`}>{option.linkName}</button></Link>
        ))
      }
    </div>
  )
}

export default MyAccountSidebar
