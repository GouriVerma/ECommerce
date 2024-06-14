import React, { useState, useEffect } from 'react'
import data_product from '../Assets/data'
import Timeline from '../components/Timeline';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoCameraOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaX } from 'react-icons/fa6';
import { SlLocationPin, SlPhone } from 'react-icons/sl';
import useAuth from '../hooks/useAuth';

const ratingOptions=[1,2,3,4,5]
const address={_id:1,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"};


const OrderDetails = () => {
    const {auth}=useAuth();

    const [product,setProduct]=useState({});
    const [rating,setRating]=useState(0);
    const [files,setFiles]=useState(null);

    useEffect(()=>{
        
        setProduct(data_product[0])
    },[])

    const handleFileChange=(e)=>{
        console.log(Object.keys(e.target.files));    
        setFiles(e.target.files);
    }


    return (
    <div className='pt-28 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>


      <div className='flex flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0'>

        {/* order details and review */}
        <div className='border rounded p-3 flex-1'>
            {/* order details */}
            <div className='flex font-xlato space-x-4 '>
                
                {/* image section */}
                <div className='rounded w-20 h-28 flex flex-col items-center'>                    
                    <img src={product.image} alt="" />
                </div>

                {/* info section */}
                <div className='flex flex-col space-y-2'>
                    <h2 className='sm:text-lg font-semibold'>{product.name}</h2>
                    <h3 className='text-gray-400'>Sold by: Genius Apparels Ltd.</h3>

                    {/* size and quantity option */}
                    <div className='flex text-sm text-gray-400 space-x-4'>
                    <p className='bg-gray-100 rounded-sm px-1'>Size: XL</p>
                    <p className='bg-gray-100 rounded-sm px-1'>Qty: 1</p>
                    </div>
                </div>

                
            </div>

            
            
            <h2 className='font-semibold mt-1 sm:text-lg '>Order Details</h2>

            {/* timeline section */}
            <div className='mt-4 ml-8'>
                
                <Timeline />
            </div>

            <h2 className='font-semibold mt-1 sm:text-lg '>Review</h2>
            {/* review */}
            <div>
                <div className='flex justify-between'>

                    {/* rating */}
                    <div className='flex space-x-3 items-center'>
                        {
                        ratingOptions.map((ratingNumber,index)=>{
                        if(ratingNumber <=rating){
                            return <FaStar key={index} className='text-yellow-400 w-7 h-7' />
                        }
                        else{
                            return <FaRegStar key={index} className='text-gray-200 w-7 h-7 ' onClick={()=>setRating(ratingNumber)}  />
                        }
                        
                         
                    })}
                    </div>

                    {/* image input */}
                    <label htmlFor='reviewImage' className='flex items-center space-x-2 border border-gray-500 p-2 rounded font-xlato text-gray-600'><IoCameraOutline className='w-5 h-5' /><p>Add Photo</p></label>
                    <input type="file" id='reviewImage' className='hidden' multiple onChange={handleFileChange} />
                </div>
                

                <div className='mt-4'>
                    <textarea className='focus:outline-none border px-2 py-1 rounded w-full' placeholder='Write a review' rows={5} style={{resize:'none'}} />
                </div>
                
                {/* images uploaded */}
                <div className='flex space-x-4 flex-wrap mt-4'>
                    {   files && 
                        Object.keys(files).map((keyIndex,index)=>(
                            <div key={index} className='relative'>
                                <img src={URL.createObjectURL(files[keyIndex])} className='w-28 h-24' />
                                <FaX className='absolute top-2 right-2 text-gray-300' />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

        {/* shipping details and price details */}
        <div className='flex flex-col flex-1 space-y-4'>
            
            {/* price details */}
            <div className='flex flex-col space-y-4 border rounded p-3'>
                <h2 className='font-semibold mt-1 sm:text-lg '>Price Details</h2>
                {/* Details */}
                <div className='flex justify-between items-center font-xlato'>
                    <h3 className='text-gray-500 lg:text-lg'>Total MRP</h3>
                    <h3 className='lg:text-lg'>₹2598</h3>
                </div>
                <div className='flex justify-between items-center font-xlato'>
                    <h3 className='text-gray-500 lg:text-lg'>Discount on MRP</h3>
                    <h3 className='lg:text-lg text-green-600'>-₹1000</h3>
                </div>
                <div className='flex justify-between items-center font-xlato'>
                    <h3 className='text-gray-500 lg:text-lg'>Coupon Discount</h3>
                    <h3 className='lg:text-lg text-green-600'>-₹179</h3>
                </div>
                <div className='flex justify-between items-center font-xlato'>
                    <h3 className='text-gray-500 lg:text-lg'>Shipping Fee</h3>
                    <h3 className='lg:text-lg'><span className='line-through'>₹100</span><span className=' text-green-600 ml-2'>FREE</span></h3>
                </div>
                <hr />
                <div className='flex justify-between items-center'>
                    <h3 className='font-semibold font-xlato md:text-xl'>Total Amount</h3>
                    <h3 className='lg:text-lg font-semibold'>₹1589</h3>
                </div>

                <button className='bg-slate-900 text-white py-2 lg:text-lg tracking-wide font-semibold rounded-sm'>PLACE ORDER</button>
            </div>
            
            {/* shipping details */}
            <div className='flex flex-col space-y-4 border rounded p-3'>
                <h2 className='font-semibold mt-1 sm:text-lg '>Shipping Details</h2>
                <div className='flex space-y-2 flex-col font-xlato'>
                    <h2 className='font-semibold'>{address.nameOfPerson}</h2>
                    <h3 className='text-gray-600 flex items-center space-x-1  '><span className=''><SlLocationPin className='sm:w-4 sm:h-4 h-full' /></span><span>{address.BuildingInfo + ", "+ address.AreaInfo + ", " + address.City + "-" + address.pinCode + ", "+ address.state + ", "+address.country}</span></h3>
                    <h3 className='text-gray-600 flex items-center space-x-1 '><span><SlPhone /></span><span>{address.phoneNumber}</span></h3>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
