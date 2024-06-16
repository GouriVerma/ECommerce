import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md';
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AddAddress from './AddAddress';

const SavedAddress = ({setAddress}) => {
  const {auth}=useAuth();
  const axiosPrivate=useAxiosPrivate();

  const [savedAddress,setSavedAddress]=useState([]);
  const [selectedAddress,setSelectedAddress]=useState({});
  const [newAddressDialogOpen,setNewAddressDialogOpen]=useState(false);

  const handleAddressDialogBox=()=>{
    setNewAddressDialogOpen(false);
  }

  useEffect(()=>{
    const fetchAddresses=async()=>{
      
      try {
        const res=await axiosPrivate.get(`/user/address/${auth._id}`);
        console.log(res.data);
        setSavedAddress(res.data);
      } catch (error) {
        console.log(error.response.data.error);
      }

    }
    fetchAddresses();

  },[newAddressDialogOpen])


  return (
    <div>
      <h2 className='sm:text-2xl text-xl font-xpoppins'>Saved Address</h2>
      <div className='flex gap-2 flex-col mt-8'>
        {
        savedAddress.map((address)=>(
          <div key={address._id} className='flex space-x-4 border p-4 rounded'>
            <div>
              <input type="radio" checked={address._id==selectedAddress._id} onChange={()=>{setSelectedAddress(address); setAddress(address)}} />
            </div>
            <div className='flex flex-col space-y-2 font-xlato '>
              <h2 className='font-semibold sm:text-lg'>{address.name}</h2>

              <div>
                <h3 className='text-sm font-bold'>Address</h3>
                <p className='text-gray-500'>{address.houseAddress + " " + address.areaAddress + " "+address.city + "-"+address.pinCode+", "+address.state+" "+address.country}</p>
              </div>
              <div>
                <h3 className='text-sm font-bold'>Phone</h3>
                <p className='text-gray-500'>{address.phone}</p>
              </div>
            </div>
          </div>
        ))}
        <button 
          className={`w-full border-gray-300 rounded flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins border hover:bg-orange-500 hover:text-white  ${newAddressDialogOpen?"hidden":""}`}
          onClick={()=>setNewAddressDialogOpen(true)}
          >
          <MdAdd className='w-7 h-7' />Add New Address
        </button>

        <div className='mt-8'>
          {newAddressDialogOpen && <AddAddress handleAddressDialogBox={handleAddressDialogBox} /> }
        </div>
        
      </div>
    </div>
  )
}

export default SavedAddress
