import axios, { BASE_URL } from '../api/axios'
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthProvider';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
const LOGIN_URL="/auth/login"
import { toast } from 'react-toastify';


const Login = () => {
  const {setAuth}=useAuth();
  const navigate=useNavigate();
  const location=useLocation();
  const from=location.state?.from?.pathname || "/"

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword,setShowPassword]=useState(false);

  const notifyMailSent=()=>  toast.success('Mail has been sent for reset password', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
    });

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res=await axios.post(LOGIN_URL,{email,password});
      console.log(res.data);
      setAuth(res.data);
      navigate(from,{replace:true})

    } catch (error) {
      if(!error.response.data.error){
        setError('No Server Response');
      }
      setError(error.response.data.error);
      console.log(error);

    } finally{
      setLoading(false);
      setShowPassword(false);
    }
    

  }

  const handleForgotPassword=async()=>{
    console.log(email);
    if(!email){
      setError("Please enter email");
    }
    else{
      try {
        setLoading(true);    
        const res=await axios.post(`${BASE_URL}/auth/password/forgot`,{email});
        console.log(res.data);
        notifyMailSent();
        
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
  }
    

  return (
    <div className='m-0 p-0'>
      {loading ?
      <Loading />

      :

      //sign in
      <div className='flex w-full justify-center'>

        {/* form part */}
        <div className='lg:w-1/2 w-full px-8 py-8 space-y-4'>


          {/* logo section */}
          <div>

          </div>

          

          

          {/* form section */}
          <form onSubmit={handleSubmit} className='flex flex-col space-y-8 max-w-[642px] mx-auto'>
            <h1 className='text-3xl font-xlato font-semibold text-gray-800'>Sign in to your account</h1>

            <div className={`${error?"opacity-100":"opacity-0"} text-red-700 bg-red-100 rounded py-4 px-2 capitalize`}>
              <p>{error}</p>
            </div>
           
            <div className='flex flex-col sm:text-lg font-xlato space-y-2'>
              <label htmlFor="" className=''>Email Address</label>
              <input 
              required 
              type="email" 
              className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base' 
              placeholder='Email Address'
              onChange={(e)=>setEmail(e.target.value)} 
              value={email}
              autoComplete='on'
              />
            </div>
            <div className='flex flex-col sm:text-lg font-xlato space-y-2'>
              <label htmlFor="" className=''>Password</label>
              <input
               required 
               type={`${showPassword?"text":"password"}`}
               className='focus:outline-none border px-3 py-3 rounded border-gray-300 text-base ' 
               placeholder='Password'
               onChange={(e)=>setPassword(e.target.value)} 
               value={password} />

               <div className='flex justify-between'>
                <div className='flex items-center gap-1'>
                  <input type="checkbox" id='showPassword' className='text-slate-800 focus:ring-0 rounded-sm' value={showPassword} onChange={(e)=>setShowPassword(e.target.checked)} />
                  <label htmlFor="showPassword" className=' text-gray-800 font-xlato text-base cursor-pointer'>Show Password</label>
                </div>
                <p onClick={handleForgotPassword} className='cursor-pointer font-semibold text-gray-800 font-xlato text-base'>Forgot Password?</p>
               </div>
              
            </div>

            <button className='bg-slate-800 text-white py-4 rounded sm:text-lg font-xlato hover:bg-orange-500' type='submit'>SIGN IN</button>

            <div className='mx-auto font-xlato'>
              <p>Don't have an account? <Link to="/signup" className='font-semibold'>Sign Up</Link></p>
            </div>
          </form>
        </div>

        {/* image section */}
        <div className='lg:w-1/2 lg:flex hidden'>
          <img src="https://img.freepik.com/premium-photo/young-beautiful-woman-wearing-black-evening-dress-posing-black-background_254969-2242.jpg" alt="" className='w-full h-[100vh] object-cover' />
        </div>
      </div>
    }
    </div>
  )
}

export default Login
