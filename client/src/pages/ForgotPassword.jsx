import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios, { BASE_URL } from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const ForgotPassword = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const id=location.pathname.split('/')[2];
    console.log(id);

    const [showPassword,setShowPassword]=useState(false);
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);

    const notifyPasswordResetSuccess=()=>  toast.success('Password Reset Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
            setError("Passwords don\'t match");
            // notifyPasswordDontMatch();
        }
        else{
            try {
                setLoading(true);
                const res=await axios.put(`${BASE_URL}/auth/password/reset/${id}`,{password,confirmPassword});
                console.log(res.data);
                notifyPasswordResetSuccess();
                navigate('/login');
    
    
            } catch (error) {
                console.log(error);
                
            } finally{
                setLoading(false);
            }
        }

        
    }
  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4 min-h-[75vh]'>
        

       {loading ? <Loading />
       : 
      <form onSubmit={handleSubmit} className='flex flex-col space-y-8 max-w-[642px] mx-auto'>
        <h1 className='text-3xl font-xlato font-semibold text-gray-800'>Set up a new password</h1>
        <div className={`${error?"opacity-100":"opacity-0"} text-red-700 bg-red-100 rounded py-4 px-2 capitalize`}>
            <p>{error}</p>
        </div>
        <div className='flex flex-col sm:text-lg font-xpoppins space-y-2'>
            <label htmlFor="" className=''>Password</label>
            <input
            required 
            type={`${showPassword?"text":"password"}`}
            className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base ' 
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)} 
            value={password} />
            
        </div>

        <div className='flex flex-col sm:text-lg font-xpoppins space-y-2'>
            <label htmlFor="" className=''>Confirm Password</label>
            <input
            required 
            type={`${showPassword?"text":"password"}`}
            className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base ' 
            placeholder='Confirm Password'
            onChange={(e)=>setConfirmPassword(e.target.value)} 
            value={confirmPassword} />
            
        </div>

        <div className='flex items-center gap-1'>
            <input type="checkbox" className='text-slate-800 focus:ring-0 rounded-sm' onChange={(e)=>setShowPassword(e.target.checked)} />
            <label htmlFor="" className=' text-gray-800 font-xlato text-base'>Show Password</label>
        </div>

        <button className='bg-slate-800 text-white py-4 rounded sm:text-lg font-xlato hover:bg-orange-500' type='submit'>SET PASSWORD</button>

      </form>
      }
    </div>
  )
}

export default ForgotPassword
