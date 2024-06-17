import React,{useState,useEffect} from 'react'
import PlaceOrderTimeline from '../components/PlaceOrderTimeline'
import { useLocation, useNavigate } from 'react-router-dom'
import AddAddress from '../components/ShippingAddressComponents/AddAddress';
import PaymentDetailsCard from '../components/ShippingAddressComponents/PaymentDetailsCard';
import OrderSummary from '../components/ShippingAddressComponents/OrderSummary';
import SavedAddress from '../components/ShippingAddressComponents/SavedAddress';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { BASE_URL } from '../api/axios';

const ShippingAddress = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth}=useAuth();
  const location=useLocation();
  const navigate=useNavigate();
  const [products,setProducts]=useState(null);
  const [orderInfo,setOrderInfo]=useState(null);

  useEffect(()=>{
    if(!location.state){
      navigate(`/cart/${auth._id}`)
    }
    else{
      setProducts(location.state.products);
      setOrderInfo(location.state.orderInfo);
    }
    
  },[])

  
  
  
  

  const [selectedAddress,setSelectedAddress]=useState(null);

  const notifySelectAddress=()=>
    toast('Select Address', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
  

  const handleSelectAddress=(address)=>{
    console.log(address);
    setSelectedAddress(address);
  }

  const handleProceed=()=>{
    if(selectedAddress){
      navigate(`/place-order/payment-options/${auth._id}`,{state:{'address':selectedAddress,'products':products,'orderInfo':orderInfo}})
      // handleCheckoutForPayment();
    }
    else{
      notifySelectAddress();
    }
    
  }

  // const handleCheckoutForPayment=async()=>{
  //   try {
  //     const keyRes=await axiosPrivate.get("/payment/get-api");
  //     console.log(keyRes.data);

  //     const orderRes=await axiosPrivate.post("/payment/checkout",{amount:orderInfo.totalAmount});
  //     console.log(orderRes.data);

  //     if(keyRes.data.key && orderRes.data.id ){
  //       const options = {
  //         key:keyRes.data.key,
  //         amount: orderRes.data.amount, 
  //         currency: "INR",
  //         name: "Gouri Verma",
  //         description: "Test Transaction",
  //         image: "https://img.freepik.com/free-vector/fashion-logo-editorial-template_23-2148701249.jpg?w=826&t=st=1718536830~exp=1718537430~hmac=46cf1b354c751c99dcc92cfad185264f2eb72e097f41e08200fcab07711e4336",
  //         order_id: orderRes.data.id, 
  //         callback_url: `http://localhost:8000/api/payment/payment-verification`,
  //         prefill: {
  //           "name": "Gaurav Kumar",
  //           "email": "gaurav.kumar@example.com",
  //           "contact": "9000090000"
  //         },
  //         notes: {
  //             address: "Razorpay Corporate Office"
  //         },
  //         theme: {
  //             color: "#1c1c1c"
  //         },
  //       };
  //       console.log("options",options);
  //       const razor = new window.Razorpay(options);
  //       razor.open();
  //     }
    
      
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }





 
  return (
    
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>
      {products && orderInfo &&
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
              onClick={handleProceed}
              >Proceed for Checkout</button>
            </div>       
        </div>
      </div>
      }
    </div>
    
  )
}

export default ShippingAddress
