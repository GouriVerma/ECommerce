import React,{useState,useEffect, useCallback} from 'react'
import { MdAdd } from 'react-icons/md'
import {City, Country, State} from 'country-state-city'
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';





const AddAddress = () => {
    const axiosPrivate=useAxiosPrivate();
    const {auth,setAuth}=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
    let countryData=Country.getAllCountries();
    const [stateData,setStateData]=useState([]);
    const [cityData,setCityData]=useState([]);
    const [address,setAddress]=useState({});
    const [loading, setLoading] = useState(false);
    
    const countryOptions=[{}];
    countryData.forEach((country)=>countryOptions.push({value:country.isoCode, label:country.name}))
    const notifyAddressUpdated=()=>toast.success('Updated Address Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
    });

    const notifyAddressAdded=()=>toast.success('Added Address Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
    });

    const handleSubmit=useCallback(async (e)=>{
        // console.log(address);
        e.preventDefault();

        if(!location.state?.address){
            try {
                setLoading(true);
                console.log(address);
                const res=await axiosPrivate.post(`/user/address/${auth._id}`,{...address,country:address.country.label,state:address.state.label,city:address.city.label});
                console.log(res);
                navigate(`/my-account/manage-address/${auth._id}`);
                notifyAddressAdded();
                
                
            } catch (error) {
                console.log(error);
                if(error.response.status==401){
                    setAuth({});
                    navigate('/login')
                  }
            } finally{
                setLoading(false);
            }
        }
        else{
            try {
                setLoading(true);
                console.log(address);
                console.log({...address,country:address.country.label,state:address.state.label,city:address.city.label});
                const res=await axiosPrivate.put(`/user/address/${auth._id}?savedAddressId=${location.state.address._id}`,{...address,country:address.country.label,state:address.state.label,city:address.city.label});
                console.log(res);
                notifyAddressUpdated();
                navigate(`/my-account/manage-address/${auth._id}`);
                
            } catch (error) {
                console.log(error);
                if(error?.response?.status==401){
                    setAuth({});
                    navigate('/login')
                  }
            } finally{
                setLoading(false);
            }
        }
        
    })

    

    // Set initial country and load states
    useEffect(() => {
        if (location.state?.address) {
            const initialAddress = location.state.address;
            console.log(initialAddress);
            setAddress(initialAddress);
            const country = countryOptions.find(country => country.label === initialAddress.country);
            
            if (country) {
                setStateData(State.getStatesOfCountry(country.value).map(state => ({ value: state.isoCode, label: state.name })));
                setAddress(prev => ({ ...prev, country }));
            }
        }
    }, []);

    useEffect(() => {
        if (stateData.length>0) {
            if(location.state?.address){
                const initialAddress = location.state.address;
                const state = stateData.find(state => state.label === initialAddress.state);
                if (state) {
                    setCityData(City.getCitiesOfState(address.country.value, state.value).map(city => ({ value: city.name, label: city.name })));
                    setAddress(prev => ({ ...prev, state }));
                }
            }
            
            else{
                setAddress(prev=>({...prev,state:stateData[0]}))
            }
        }
    }, [stateData]);

    useEffect(() => {
        if (cityData.length>0) {
            if(location.state?.address){
                const initialAddress = location.state?.address;
                const city = cityData.find(city => city.label === initialAddress.city);
                if (city) {
                    setAddress(prev => ({ ...prev, city }));
                }
            }
            
            else{
                setAddress(prev=>({...prev,city:cityData[0]}))
            }
        }
    }, [cityData]);

    useEffect(() => {
        if (address.country) {
            setStateData(State.getStatesOfCountry(address.country.value).map(state => ({ value: state.isoCode, label: state.name })));
        }
    }, [address.country]);

    // Update city data when state changes
    useEffect(() => {
        if (address.state) {
            setCityData(City.getCitiesOfState(address.country.value, address.state.value).map(city => ({ value: city.name, label: city.name })));
        }
    }, [address.state]);

    
    
  return (
    <div>
    {loading ?
        <Loading />
        :
      <div>
            <h2 className='sm:text-2xl text-xl font-xpoppins'>Add New Address</h2>
            <hr />
            <form className='flex flex-col sm:space-y-8 space-y-4 flex-1 mt-6' onSubmit={handleSubmit} >
                

                {/* Name */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Name</label>
                    <input required className='border focus:outline-none px-4 py-2 w-full' type="text" value={address['name']} 
                    onChange={(e)=>setAddress(prev=>({...prev,name:e.target.value}))} 
                    spellCheck={false}/>
                </div>

                {/* email and phone */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Email Address</label>
                        <input required className='border focus:outline-none px-4 py-2 w-full' type="email" value={address['email']} 
                        onChange={(e)=>setAddress(prev=>({...prev,email:e.target.value}))} 
                        spellCheck={false}
                        />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Phone</label>
                        {/* <input required className='border focus:outline-none px-4 py-2 w-full' type="tel" value={address['phone']} onChange={(e)=>setAddress(prev=>({...prev,phone:e.target.value}))} /> */}
                        <PhoneInput
                            value={address.phone}
                            onChange={(phoneHere)=>setAddress((prev)=>({...prev,phone:phoneHere}))}
                            defaultCountry="IN"
                            className='focus:outline-none'
                            initialValueFormat="national"
                            required
                        />
                    </div>
                </div>

                {/* building info */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">House Address</label>
                    <input required className='border focus:outline-none px-4 py-2 w-full' type="text" 
                    placeholder='House no, Flat no, Building no' value={address['houseAddress']} 
                    onChange={(e)=>setAddress(prev=>({...prev,houseAddress:e.target.value}))} 
                    spellCheck={false}/>
                </div>
                {/* area info */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Area Address</label>
                    <input required className='border focus:outline-none px-4 py-2 w-full' type="text" 
                    placeholder='Street no, Colony, Society' value={address['areaAddress']} 
                    onChange={(e)=>setAddress(prev=>({...prev,areaAddress:e.target.value}))}
                    spellCheck={false} />
                </div>

                {/* pin and country */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Pincode</label>
                        <input required 
                        className='border focus:outline-none px-4 py-2 w-full' 
                        type="text" value={address['pinCode']} onChange={(e)=>setAddress(prev=>({...prev,pinCode:e.target.value}))}
                        spellCheck={false} />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Country</label>
                        {/* <input required className='border focus:outline-none px-4 py-2 w-full' type="text" /> */}
                        <Select options={countryOptions} value={address.country} onChange={(selectedOption)=>{setAddress(prev=>({...prev,country:selectedOption}))}} required />
                    </div>
                    
                </div>
                {/* state and city */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">State</label>
                        {/* <input required className='border focus:outline-none px-4 py-2 w-full' type="text" /> */}
                        <Select options={stateData} value={address.state} onChange={(selectedOption)=>{setAddress(prev=>({...prev,state:selectedOption}))}} />
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">City</label>
                        {/* <input required className='border focus:outline-none px-4 py-2 w-full' type="text" /> */}
                        <Select styles={{borderRadius:"1px"}} options={cityData} value={address.city} onChange={(selectedOption)=>{setAddress(prev=>({...prev,city:selectedOption}))}} />
                    </div>
                   
                </div>

                <button className='w-full border-gray-300 flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins bg-slate-800 hover:bg-orange-500 text-white'><MdAdd className='w-7 h-7' />Add Address</button>
            </form>
        </div>
    }
    </div>
  )
}

export default AddAddress
