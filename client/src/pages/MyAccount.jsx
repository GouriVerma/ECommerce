import React, { useEffect, useState } from 'react'
import MyAccountSidebar from '../components/MyAccountSidebar'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import MyAccountTopBar from '../components/MyAccountSidebarMobile'
import { BsFilterLeft } from "react-icons/bs";
import useAuth from '../hooks/useAuth'

const options=[
  {path:"/my-account/personal-information",linkName:"Personal Information"},
  {path:"/my-account/my-orders",linkName:"My Orders"},
  {path:"/my-account/manage-address",linkName:"Manage Address"},
  {path:"/my-account/password-manager",linkName:"Password Manager"},
  {path:"/my-account/payment-method",linkName:"Payment Method"},
  {path:"/my-account/logout",linkName:"Logout"},

]

const MyAccount = () => {
  const location=useLocation();
  const {auth}=useAuth();
  const id=auth._id;
  // const activeTab=options.filter((option)=>option.path==location.pathname.split("/"+id)[0])[0].linkName;
  const [openDialog,setOpenDialog]=useState(false);
  console.log(options.filter((option)=>option.path==location.pathname.split("/"+id)[0]));


  // useEffect(()=>{
  //   setOpenDialog(false);
  // },[activeTab])

  const handleClose=()=>{
    setOpenDialog(false);
  }



  return (
    <div className='pt-28 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4 relative'>

      {/* filters btn in mobile */}
      <button onClick={()=>setOpenDialog(true)}><BsFilterLeft className='md:hidden w-8 h-8 border border-gray-300 rounded p-1 absolute top-20 text-gray-500' /></button>
      
      {/* filters in mobile */}
      <div className={`md:hidden shadow-2xl absolute w-56 h-[87vh] top-16 bg-white z-10 transition-all duration-500 ${openDialog?"-translate-x-4":"-translate-x-60"}`}>
        <MyAccountTopBar handleClose={handleClose} />
      </div>
      
      <Outlet />
    </div>
  )
}

export default MyAccount
