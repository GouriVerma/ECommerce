import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import {City, Country, State} from 'country-state-city'
import Select from 'react-select';
import PhoneInput from 'react-phone-number-input'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Loading from '../Loading';

const AddAddress = ({handleAddressDialogBox}) => {
    const axiosPrivate=useAxiosPrivate();
    const {auth}=useAuth();

    let countryData=Country.getAllCountries();
    const [stateData,setStateData]=useState([]);
    const [cityData,setCityData]=useState([]);
    const [address,setAddress]=useState({name:"",email:"",phone:"",houseAddress:"",areaAddress:"",pinCode:"",city:null,state:null,country:null});
    const [loading, setLoading] = useState(false);

    const countryOptions=[{}];
    countryData.forEach((country)=>countryOptions.push({value:country.isoCode, label:country.name}))

    const handleSubmit=async (e)=>{
        console.log(address);
        e.preventDefault();
        
        try {
            setLoading(true);
            const res=await axiosPrivate.post(`/user/address/${auth._id}`,{...address,country:address.country.label,state:address.state.label,city:address.city.label});
            console.log("add address",res.data);
            handleAddressDialogBox();
            
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }


    useEffect(() => {
        
        {address['country'] && setStateData(State.getStatesOfCountry(address['country'].value).map(state => ({ value: state.isoCode, label: state.name })))}
    }, [address['country']]);

    useEffect(()=>{
        {stateData && setAddress(prev=>({...prev,state:stateData[0]}))}
    },[stateData])
    
    useEffect(() => {
        
        {address['state'] && setCityData(City.getCitiesOfState(address['country'].value, address['state'].value).map(city => ({ value: city.name, label: city.name })))}
        
    }, [address['state']]);

    useEffect(()=>{
        {cityData && setAddress(prev=>({...prev,city:cityData[0]}))}
    },[cityData])

    

    
  return (
    <div>
    {loading ?
        <Loading />
    :
      <div>
            <h2 className='sm:text-2xl text-xl font-xpoppins'>Add New Address</h2>
            
            <form className='flex flex-col sm:space-y-8 space-y-4 flex-1 mt-8' onSubmit={handleSubmit} >
                

                {/* Name */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Name</label>
                    <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" value={address['name']} onChange={(e)=>setAddress(prev=>({...prev,name:e.target.value}))} />
                </div>

                {/* email and phone */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Email Address</label>
                        <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="email" value={address['email']} onChange={(e)=>setAddress(prev=>({...prev,email:e.target.value}))} />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Phone</label>
                        {/* <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="tel" value={address['phone']} onChange={(e)=>setAddress(prev=>({...prev,phone:e.target.value}))} /> */}
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
                    <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" placeholder='House no, Flat no, Building no' value={address['houseAddress']} onChange={(e)=>setAddress(prev=>({...prev,houseAddress:e.target.value}))} />
                </div>
                {/* area info */}
                <div className='flex flex-col gap-2'>
                    <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Area Address</label>
                    <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" placeholder='Street no, Colony, Society' value={address['areaAddress']} onChange={(e)=>setAddress(prev=>({...prev,areaAddress:e.target.value}))} />
                </div>

                {/* pin and country */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Pincode</label>
                        <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" value={address['pinCode']} onChange={(e)=>setAddress(prev=>({...prev,pinCode:e.target.value}))} />
                    </div>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">Country</label>
                        {/* <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" /> */}
                        <Select options={countryOptions} value={address['country']} onChange={(selectedOption)=>{setAddress(prev=>({...prev,country:selectedOption}))}} required />
                    </div>
                    
                </div>
                {/* state and city */}
                <div className='flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:space-x-6'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">State</label>
                        {/* <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" /> */}
                        <Select options={stateData} value={address['state']} onChange={(selectedOption)=>{setAddress(prev=>({...prev,state:selectedOption}))}} />
                    </div>

                    <div className='flex-1 flex flex-col gap-2'>
                        <label className='sm:text-lg text-gray-700 font-xpoppins' htmlFor="">City</label>
                        {/* <input required className='border focus:outline-none rounded px-4 py-2 w-full' type="text" /> */}
                        <Select options={cityData} value={address['city']} onChange={(selectedOption)=>{setAddress(prev=>({...prev,city:selectedOption}))}} />
                    </div>
                   
                </div>

                <button className='w-full border-gray-300 rounded flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins border hover:bg-orange-500 hover:text-white'><MdAdd className='w-7 h-7' />Add Address</button>
            </form>
        </div>
    }    
    </div>
  )
}

export default AddAddress
