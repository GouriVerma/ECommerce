import React, { useEffect, useState } from 'react'
import MyAccountSidebar from './MyAccountSidebar'
import { SlLocationPin, SlPhone } from "react-icons/sl";
import { MdAdd, MdOutlineDelete, MdOutlineEdit } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { FaLocationArrow, FaLocationDot, FaPhone } from 'react-icons/fa6';
import Loading from './Loading';
import { toast } from 'react-toastify';


const addresses=[
  {_id:1,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"},
  {_id:2,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"},
  {_id:3,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"},
]



const ManageAddress = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth,setAuth}=useAuth();
  
  const location=useLocation();
  const id=location.pathname.split("/")[3];
  const navigate=useNavigate();

  const [saveAddresses,setSavedAddresses]=useState([]);
  const [loading, setLoading] = useState(false);

  const notifyAddressDeleted=()=>toast.error('Deleted Address Successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
});

  const handleDeleteAddress=async(addressId)=>{
    try {
      setLoading(true);
      const res=await axiosPrivate.delete(`/user/address/${auth._id}?savedAddressId=${addressId}`);
      console.log(res.data);
      notifyAddressDeleted();
      setSavedAddresses(res.data.adresses)
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    const fetchAddresses=async()=>{
      
      try {
        setLoading(true);
        const res=await axiosPrivate.get(`/user/address/${auth._id}`);
        console.log(res?.data);
        setSavedAddresses(res?.data);
      } catch (error) {
        console.log(error.response);
        if(error.response.status==401){
          setAuth({});
          navigate('/login')
        }
      } finally{
        setLoading(false);
      }

    }
    fetchAddresses();
    
  },[])

  


  return (
    <div className='pt-8 sm:pt-0'>
      {loading?
        <Loading />
      :
        <div>
          <div className='flex md:space-x-8'>

            {/* sidebar */}
            <div className='w-1/4 lg:px-4 px-2 hidden md:flex'>
              <MyAccountSidebar activeTab={"Manage Address"} />
            </div>

            {/* right section */}
            <div className='flex-1'>
              <div className='flex flex-col space-y-4 font-xpoppins '>
                {
                  saveAddresses.map((address)=>(
                    <div key={address._id} className='border px-4 py-2 flex rounded justify-between'>
                      <div className='flex space-y-2 flex-col'>
                        <h2 className='font-semibold sm:text-lg font-xlato '>{address.name}</h2>
                        <div>
                          <h2 className='font-semibold text-sm text-gray-800 flex items-center space-x-2'><div><FaLocationDot className='text-slate-700' /></div><div>Address</div></h2>
                          <h3 className='text-gray-400 font-xpoppins'>{address.houseAddress + ", "+ address.areaAddress + ", " + address.city + "-" + address.pinCode + ", "+ address.state + ", "+address.country}</h3>
                        </div>
                        <div>
                          <h2 className='font-semibold text-sm text-gray-800 flex items-center space-x-2'><div className='ml-1'><FaPhone /></div><div>Phone</div></h2>
                          <h3 className='text-gray-400'>{address.phone}</h3>
                        </div>
                        
                      </div>

                      <div className='flex space-x-3 font-xlato items-start'>
                        <Link to={`/my-account/add-address/${id}?savedAddressId=${address._id}`} state={{'address':address}} className='font-semibold text-gray-600 hover:underline'><MdOutlineEdit className='w-6 h-6' /></Link>
                        <button className='font-semibold text-gray-600 hover:underline'
                        onClick={()=>handleDeleteAddress(address._id)}
                        ><MdOutlineDelete className='w-6 h-6' /></button>
                      </div>
                    </div>
                  ))
                }

                <Link className='w-full' to={`/my-account/add-address/${id}`}><button className='w-full rounded-sm  flex items-center justify-center py-4 px-2 sm:text-lg font-xpoppins text-white bg-slate-800 hover:bg-orange-500'><MdAdd className='w-7 h-7' />Add Address</button></Link>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ManageAddress
