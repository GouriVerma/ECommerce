import React, { useState,useEffect } from 'react'
import MyAccountSidebar from './MyAccountSidebar'
import { MdEdit } from 'react-icons/md'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import MyAccountTopBar from './MyAccountSidebarMobile'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import Loading from './Loading'

const PersonalInformation = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth,setAuth}=useAuth();
  const [file,setFile]=useState(null);
  const [user,setUser]=useState({});
  const [disabled,setDisabled]=useState(true);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      setDisabled(!disabled);
      const res=await axiosPrivate.put(`/user/${auth._id}`,{userName:user.userName,phone:user.phone});
      console.log(res.data);
      setUser(res.data);

      if(file){
        const formdata=new FormData();
        formdata.append('file',file);
        const res2=await axiosPrivate.post(`/user/profile/upload`,formdata);
        console.log(res2.data);
      }
      
      updateDetailsNotify();
    } catch (error) {
      console.log(error.response.data);
    } finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        setLoading(true);
        const res=await axiosPrivate.get(`/user/${auth._id}`);
        console.log(res.data);
        setUser({...res.data});
      } catch (error) {
        console.log(error.response.data.error);
      } finally{
        setLoading(false);
      }

    }
    fetchUser();
  },[])


  return (
    <div className=' md:pt-0'>

      {loading?
        <Loading />
        :
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
                <img src={file? URL.createObjectURL(file) : user.profileUrl?.url} alt="" className='rounded-full sm:w-28 sm:h-28 w-20 h-20 object-cover' />
                <label htmlFor="profileImage"><MdEdit className={`w-8 h-8 p-1 absolute sm:left-20 left-12 bottom-1 bg-slate-900 text-white rounded-full ${!disabled && 'cursor-pointer'}`} /></label>
                <input type="file" id='profileImage' className='hidden' onChange={handleFileChange} disabled={disabled} />
              </div>

              {/* first name and last name */}
              <div className='flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>                
                <div className='flex-1 flex flex-col gap-2'>
                  <h2 className='sm:text-lg text-gray-600 font-xpoppins'>Full name</h2>
                  <input type="text" className={`border focus:outline-none rounded-sm px-4 py-2 w-full ${disabled && "text-gray-500"}`} value={user.userName} disabled={disabled} onChange={(e)=>setUser((prev)=>({...prev,userName:e.target.value}))} />
                </div>
              </div>

              {/* email */}
              <div className='flex flex-col gap-2'>
                <h2 className='sm:text-lg text-gray-600 font-xpoppins'>Email</h2>
                <input type="email" className='border focus:outline-none rounded-sm px-4 py-2 w-full text-gray-500' value={user.email} disabled />
              </div>
              {/* Phone */}
              <div className='flex flex-col gap-2'>
                <h2 className='sm:text-lg text-gray-600 font-xpoppins'>Phone</h2>
                {/* <input type="tel" className='border focus:outline-none rounded-sm px-4 py-2 w-full' /> */}
                <PhoneInput
                  value={user.phone}
                  onChange={(phoneHere)=>setUser((prev)=>({...prev,phone:phoneHere}))}
                  defaultCountry="IN"
                  className={`${disabled && "text-gray-500"}`}
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
      }
    </div>
  )
}

export default PersonalInformation
