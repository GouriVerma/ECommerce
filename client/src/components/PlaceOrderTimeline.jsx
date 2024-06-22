import React from 'react'
import { FaCartShopping, FaLocationArrow, FaLocationDot, FaMapLocationDot } from 'react-icons/fa6';
import { FaRupeeSign } from "react-icons/fa";
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const PlaceOrderTimeline = ({activePosition}) => {
    const {auth}=useAuth();
    const steps=[{name:"Shipping Cart",icon:<FaCartShopping />,link:`/cart/${auth._id}`,from:{}},{name:"Shipping Address",icon:<FaLocationDot />,link:`/place-order/shipping-address/${auth._id}`},{name:"Payment",icon:<FaRupeeSign />,link:`/place-order/payment-options/${auth._id}`}];
    
    return (
        <div className='flex justify-between font-xlato'>
            {steps.map((step,i)=>(
                <div  
                 key={i} className={`relative flex flex-col justify-center items-center step-item flex-1 ${i<=activePosition?"cursor-pointer":"cursor-default"} ${i<activePosition?"complete":""} `}>
                    <div className={`w-10 h-10 flex items-center justify-center z-10 relative rounded-full text-white font-semibold ${activePosition==i ? "bg-slate-800": i<activePosition ? "bg-green-700":"bg-slate-300"}  `}>
                        {step.icon}
                    </div>
                    <p className={`text-slate-300 text-xs sm:text-base ${activePosition>=i ? "text-slate-800":""}`}>{step.name}</p>
                </div>
                
            ))}
        
        </div>
    )
}

export default PlaceOrderTimeline
