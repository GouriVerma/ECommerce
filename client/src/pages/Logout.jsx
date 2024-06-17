import React,{useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const axiosPrivate=useAxiosPrivate();
    const {auth,setAuth}=useAuth();

    const navigate=useNavigate();

    const notifyError=()=>toast.error('Some error occured', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    const notifySuccess=()=>toast.success('Logged Out Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });

    useEffect(()=>{
        const logout=async()=>{
            try {
                const res=await axiosPrivate.post('/auth/logout',{refreshToken:auth.refreshToken});
                console.log(res);
                notifySuccess();
                setAuth({});
                navigate("/",{replace:true});
            } catch (error) {
                console.log(error);
                notifyError();
                navigate("/",{replace:true});
                
            }
        }
        logout();
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Logout
