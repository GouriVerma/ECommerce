import React from 'react'
import { useLocation,Link } from 'react-router-dom'
import PlaceOrderTimeline from '../components/PlaceOrderTimeline';
import PaymentDetailsCard from '../components/ShippingAddressComponents/PaymentDetailsCard';
import OrderSummary from '../components/ShippingAddressComponents/OrderSummary';

const PaymentInfo = () => {
    const location=useLocation();
    const {address,products,orderInfo}=location.state

    const paymentOpeions=[{label:'Cash on Delivery'},{label:'Paypal'},{label:'Google Pay'},{label:'Net Banking'}]
  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>
        <div>
            {/* timeline */}
            <PlaceOrderTimeline activePosition={2} />

            {/* payment and details */}
            <div className='sm  :mt-28 mt-20 flex flex-col space-y-12 md:flex-row md:space-x-12'>
                {/* payment section */}
                <div className='md:w-3/5'>
                    <div>
                        <h2 className='sm:text-2xl text-xl font-xpoppins'>Payment option</h2>

                        <div className='flex flex-col space-y-2 mt-8 items-center'>
                            {
                                paymentOpeions.map((option,i)=>(
                                    <div className='border border-slate-300 p-4 rounded text-center font-xpoppins w-full' key={i}>
                                        <Link className='sm:text-lg text-gray-700'>{option.label}</Link>
                                    </div>
                                ))
                            }
                        </div>
                        
                        {/* Shipping Address details */}
                        <div>
                            
                                
                            <div className='flex flex-col space-y-2 font-xlato '>
                                <h2 className='font-semibold sm:text-lg'>{address.name}</h2>

                                <div>
                                    <h3 className='text-sm font-bold'>Address</h3>
                                    <p className='text-gray-500'>{address.houseAddress + " " + address.areaAddress + " "+address.city + "-"+address.pinCode+", "+address.state+" "+address.country}</p>
                                </div>
                                <div>
                                    <h3 className='text-sm font-bold'>Phone</h3>
                                    <p className='text-gray-500'>{address.phone}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                
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

export default PaymentInfo
