import React, { useEffect, useState } from 'react'
import MyAccountSidebar from './MyAccountSidebar'
import { SlLocationPin, SlPhone } from "react-icons/sl";
import { MdAdd, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


const addresses=[
  {_id:1,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"},
  {_id:2,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"},
  {_id:3,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"},
]

const ManageAddress = () => {
  const [saveAddresses,setSavedAddresses]=useState([]);
  const location=useLocation();
  const id=location.pathname.split("/")[3];

  useEffect(()=>{
    setSavedAddresses(addresses)
  },[])


  return (
    <div className='pt-8 sm:pt-0'>
        <div>
          <div className='flex space-x-8'>

            {/* sidebar */}
            <div className='w-1/4 lg:px-4 px-2 hidden md:flex'>
              <MyAccountSidebar activeTab={"Manage Address"} />
            </div>

            {/* right section */}
            <div className='flex-1'>
              <div className='flex flex-col space-y-4 '>
                {
                  saveAddresses.map((address)=>(
                    <div key={address._id} className='border px-4 py-2 flex rounded justify-between'>
                      <div className='flex space-y-2 flex-col font-xlato'>
                        <h2 className='font-semibold sm:text-lg'>{address.nameOfPerson}</h2>
                        <h3 className='text-gray-600 flex items-center space-x-1  '><span className=''><SlLocationPin className='sm:w-4 sm:h-4 h-full' /></span><span>{address.BuildingInfo + ", "+ address.AreaInfo + ", " + address.City + "-" + address.pinCode + ", "+ address.state + ", "+address.country}</span></h3>
                        <h3 className='text-gray-600 flex items-center space-x-1 '><span><SlPhone /></span><span>{address.phoneNumber}</span></h3>
                      </div>

                      <div className='flex space-x-3 font-xlato items-start'>
                        <button className='font-semibold text-gray-600 hover:underline'><MdOutlineEdit className='w-6 h-6' /></button>
                        <button className='font-semibold text-gray-600 hover:underline'><MdOutlineDelete className='w-6 h-6' /></button>
                      </div>
                    </div>
                  ))
                }

                <Link className='w-full' to={`/my-account/add-address/${id}`}><button className='w-full border-2 border-gray-300 rounded-sm  flex items-center justify-center py-5 px-2 sm:text-lg font-xpoppins text-gray-700 hover:text-white hover:bg-slate-800'><MdAdd className='w-7 h-7' />Add Address</button></Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ManageAddress
