import React,{useState,useEffect} from 'react'
import { useLocation,Link, useNavigate } from 'react-router-dom'
import PlaceOrderTimeline from '../components/PlaceOrderTimeline';
import PaymentDetailsCard from '../components/ShippingAddressComponents/PaymentDetailsCard';
import OrderSummary from '../components/ShippingAddressComponents/OrderSummary';
import { GiMoneyStack } from "react-icons/gi";
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const PaymentInfo = () => {
    const axiosPrivate=useAxiosPrivate();
    const {auth,setAuth}=useAuth();
    const location=useLocation();
    const navigate=useNavigate();
    const [info,setInfo]=useState({products:[],orderInfo:{},address:{}});
    const [paymentOption,setPaymentOption]=useState(null);

    const paymentOpeions=[{label:'Cash on Delivery',icon:<GiMoneyStack />}]

    useEffect(()=>{
        if(!location.state){
          navigate(`/cart/${auth._id}`)
        }
        else{
            console.log(location.state);
          setInfo({products:location.state.products,orderInfo:location.state.orderInfo,address:location.state.address});
          
        }
        
      },[])

    const handleSelectPaymentOption=(option)=>{
        setPaymentOption(option.label);
    }

    const handleProceed=async ()=>{
        try {
            const res=await axiosPrivate.post('/order/new',{shippingDetails:info.address,priceDetails:info.orderInfo,orderItems:info.products});
            console.log(res.data);
            const res2=await axiosPrivate.delete('/user/cart/delete');
            console.log(res2.data);
            setAuth(prev=>({...prev,cartItemsCount:0}))
            navigate("/order-success");
        } catch (error) {
            console.log(error);
            navigate("/order-failure");
        }
    }

    
  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>
        <div>
            {/* timeline */}
            <PlaceOrderTimeline activePosition={2} />

            {/* payment and details */}
            <div className='sm  :mt-28 mt-20 flex flex-col space-y-12 md:flex-row md:space-x-12'>
                {/* payment section */}
                <div className='md:w-3/5'>
                    <div className='flex flex-col space-y-8'>
                        <div>
                            <h2 className='sm:text-2xl text-xl font-xpoppins'>Select Payment option</h2>

                            <div className='flex flex-col space-y-2 mt-8 items-center'>
                                {
                                    paymentOpeions.map((option,i)=>(
                                        
                                        <button  key={i} className='border border-slate-300 p-4 rounded text-center font-xpoppins w-full hover:bg-gray-200 sm:text-lg text-gray-700 ' onClick={()=>handleSelectPaymentOption(option)}>
                                            {option.label}
                                        </button>
                                        
                                    ))
                                }
                            </div>
                        </div>

                        <button className='w-full border-gray-300 rounded flex items-center justify-center py-3 px-2 sm:text-lg font-xpoppins text-white bg-slate-800 hover:bg-orange-500'
                        onClick={handleProceed}
                        >Proceed for Checkout</button>
                        
                        
                    </div>
                
                </div>

                <div className='border border-slate-300 hidden md:flex'>
                </div>

                {/* payment details section */}
                <div className='md:w-2/5 flex flex-col space-y-16'>
                    <PaymentDetailsCard numberOfProducts={info.products.length} orderInfo={info.orderInfo} />

                    <OrderSummary products={info.products} />

                    {/* Shipping Address details */}
                    <div className=''>
                            
                        <h2 className='sm:text-2xl text-xl font-xpoppins'>Shipping Address</h2>    
                        <div className='flex flex-col space-y-2 font-xlato mt-8 '>
                            <h2 className='font-semibold sm:text-lg'>{info.address.name}</h2>

                            <div>
                                <h3 className='font-bold'>Address</h3>
                                <p className='text-gray-500'>{info.address.houseAddress + " " + info.address.areaAddress + " "+info.address.city + "-"+info.address.pinCode+", "+info.address.state+" "+info.address.country}</p>
                            </div>
                            <div>
                                <h3 className='font-bold'>Phone</h3>
                                <p className='text-gray-500'>{info.address.phone}</p>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>       

            </div>
        </div>
      
    </div>
  )
}

export default PaymentInfo
