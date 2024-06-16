import React,{useState,useEffect} from 'react'
import PlaceOrderTimeline from '../components/PlaceOrderTimeline'
import { useLocation, useNavigate } from 'react-router-dom'
import AddAddress from '../components/ShippingAddressComponents/AddAddress';
import PaymentDetailsCard from '../components/ShippingAddressComponents/PaymentDetailsCard';
import OrderSummary from '../components/ShippingAddressComponents/OrderSummary';
import SavedAddress from '../components/ShippingAddressComponents/SavedAddress';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const ShippingAddress = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth}=useAuth();
  const location=useLocation();
  const navigate=useNavigate();

  const {products,orderInfo}=location.state;

  const [selectedAddress,setSelectedAddress]=useState({});

  const handleSelectAddress=(address)=>{
    console.log(address);
    setSelectedAddress(address);
  }



 
  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>
      <div>

        {/* timeline */}
        <PlaceOrderTimeline activePosition={1} />

        {/* address and details */}
        <div className='sm:mt-28 mt-20 flex flex-col space-y-12 md:flex-row md:space-x-12'>

            {/* address section */}
            <div className='md:w-3/5'>
              <SavedAddress setAddress={handleSelectAddress} />
              
            </div>  

            <div className='border border-slate-300 hidden md:flex'>

            </div>

            {/* payment details section */}
            <div className='md:w-2/5 flex flex-col space-y-16'>
              <PaymentDetailsCard numberOfProducts={products.length} orderInfo={orderInfo} />

              <OrderSummary products={products} />
              <button className='w-full border-gray-300 rounded flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins text-white bg-slate-800 hover:bg-orange-500'
              onClick={()=>navigate(`/place-order/payment-options/${auth._id}`,{state:{'address':selectedAddress,'products':products,'orderInfo':orderInfo}})}
              >Proceed for Checkout</button>
            </div>       
        </div>
      </div>
    </div>
  )
}

export default ShippingAddress
