import React, { useState,useEffect } from 'react'
import MyAccountSidebar from './MyAccountSidebar'
import { MdEdit } from 'react-icons/md'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import MyAccountTopBar from './MyAccountSidebarMobile'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'

const PersonalInformation = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth,setAuth}=useAuth();
  const [file,setFile]=useState(null);
  const [user,setUser]=useState({});
  const [disabled,setDisabled]=useState(true);

  const updateDetailsNotify=()=>  toast.success('Updated Details Successfully', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
    });

  const handleFileChange=(e)=>{
    setFile(e.target.files[0]);
    console.log(e.target.files);
  }


  const handleUpdateDetails=async()=>{
    try {
      setDisabled(!disabled);
      const res=await axiosPrivate.put(`/user/${auth._id}`,{userName:user.userName,phone:user.phone});
      console.log(res.data);
      setUser(res.data);
      updateDetailsNotify()
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(()=>{
    const fetchUser=async()=>{
      const res=await axiosPrivate.get(`/user/${auth._id}`);
      console.log(res.data);
      console.log(res.data.phone);
      setUser({...res.data});
    }
    fetchUser();
  },[])


  return (
    <div className=' md:pt-0'>
        <div>
          

          <div className='flex space-x-8 '>
            {/* Sidebar */}
            <div className='w-1/4 border-r lg:px-4 px-2 hidden md:flex'>
              <MyAccountSidebar activeTab={"Personal Information"} />
            </div>

            
            {/* Personal Information */}
            <div className='flex flex-col space-y-8 flex-1'>

              {/* profile image */}
              <div className='relative'>
                <img src={file? URL.createObjectURL(file) : "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"} alt="" className='rounded-full w-28 h-28 object-cover' />
                <label htmlFor="profileImage"><MdEdit className='w-8 h-8 p-1 absolute left-20 bottom-1 bg-slate-900 text-white rounded-full' /></label>
                <input type="file"id='profileImage' className='hidden' onChange={handleFileChange} />
              </div>

              {/* first name and last name */}
              <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>                
                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='sm:text-lg text-gray-600 font-xpoppins'>Full name</h2>
                  <input type="text" className='border focus:outline-none rounded-sm px-4 py-2 w-full' value={user.userName} disabled={disabled} onChange={(e)=>setUser((prev)=>({...prev,userName:e.target.value}))} />
                </div>
              </div>

              {/* email */}
              <div className='flex flex-col gap-2'>
                <h2 className='sm:text-lg text-gray-600 font-xpoppins'>Email</h2>
                <input type="email" className='border focus:outline-none rounded-sm px-4 py-2 w-full' value={user.email} disabled />
              </div>
              {/* Phone */}
              <div className='flex flex-col gap-2'>
                <h2 className='sm:text-lg text-gray-600 font-xpoppins'>Phone</h2>
                {/* <input type="tel" className='border focus:outline-none rounded-sm px-4 py-2 w-full' /> */}
                <PhoneInput
                  value={user.phone}
                  onChange={(phoneHere)=>setUser((prev)=>({...prev,phone:phoneHere}))}
                  defaultCountry="IN"
                  className='focus:outline-none'
                  initialValueFormat="national"
                  disabled={disabled}
                />
              </div>
              

              <div>
                {disabled?
                <button className='md:sm:text-lg bg-slate-800 text-white px-4 py-2 rounded-sm w-full md:w-64' onClick={()=>setDisabled(!disabled)}>UPDATE DETAILS</button>
                :<button className='md:sm:text-lg bg-slate-800 text-white px-4 py-2 rounded-sm w-full md:w-64' onClick={handleUpdateDetails}>SAVE DETAILS</button>
                }
              </div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default PersonalInformation
