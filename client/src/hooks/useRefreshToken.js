import axios from "../api/axios"
import useAuth from "./useAuth"
const REFRESH_URL="/auth/refresh";

const useRefreshToken=()=>{
    const {auth,setAuth}=useAuth();

    const refresh=async()=>{
        console.log("refreshToken",auth?.refreshToken);
        const res=await axios.put(REFRESH_URL,{refreshToken:auth?.refreshToken});
        setAuth(prev=>{
            console.log(prev);
            console.log(res.data);
            console.log({...prev,accessToken:res.data?.newAccessToken,refreshToken:res.data?.newRefreshToken})
            return {...prev,accessToken:res.data?.newAccessToken,refreshToken:res.data?.newRefreshToken};
        });
        return res.data?.newAccessToken;
        
    }

    return refresh;

}

export default useRefreshToken;