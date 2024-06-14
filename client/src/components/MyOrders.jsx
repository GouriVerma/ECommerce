import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import MyAccountSidebar from './MyAccountSidebar'
import data from "../Assets/data";
import { FaRegHeart } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const MyOrders = () => {
  const {auth}=useAuth();
  const refresh=useRefreshToken();
  const axiosPrivate=useAxiosPrivate();

  const [orders,setOrders]=useState([]);
  const [fetch,setFetch]=useState(false);

  useEffect(()=>{
    const fetchOrders=async()=>{
      console.log("auth",auth);
      try {
        const res=await axiosPrivate.get(`http://localhost:8000/api/order/my-orders`,{headers:{'Authorization': `Bearer ${auth?.accessToken}`}});
        console.log(res);
        setOrders(res?.data?.orders);
      } catch (error) {
        console.log(error.response?.data.error);
      }
      
    }
    fetchOrders();
    //setOrders(data);
  },[])

  const fetchProduct=async()=>{
    console.log(auth);
    const res=await axiosPrivate.get(`http://localhost:8000/api/order/my-orders`,{headers:{'Authorization': `Bearer ${auth?.accessToken}`}});
    console.log(res);
    
  }

  return (
    
    <div className='pt-8 sm:pt-0'>
        <div>
          <div className='flex space-x-8'>

            {/* left sidebar */}
            <div className='w-1/4 lg:px-4 px-2 hidden md:flex'>
              <MyAccountSidebar activeTab={"My Orders"} />
            </div>



            {/* products section */}
            {orders && 
              <div className='flex flex-col space-y-4 w-full'>
                 <button onClick={()=>fetchProduct()}>Fetch</button> 
                 <button onClick={()=>refresh()}>Refresh</button>
              {
              orders.map((order)=>(
                order.orderItems.map((orderProduct)=>(
                  <Link to={`/order/${orderProduct._id}`} key={orderProduct._id}>
                    <div className='flex font-xlato border rounded p-3 space-x-4 '>
                      
                      {/* image section */}
                      <div className='rounded flex flex-col items-center'>
                        
                        <img src={orderProduct.image} alt="" className='w-28 h-36 object-cover' />
                      </div>

                      {/* info section */}
                      <div className='flex flex-col space-y-2'>
                        <h2 className='sm:text-lg font-semibold'>{orderProduct.name}</h2>
                        <h3 className='text-gray-400'>Sold by: Genius Apparels Ltd.</h3>

                        {/* size and quantity option */}
                        <div className='flex text-sm text-gray-400 space-x-4'>
                          <p className='bg-gray-100 rounded-sm px-1'>Size: {orderProduct.size}</p>
                          <p className='bg-gray-100 rounded-sm px-1'>Qty: {orderProduct.quantity}</p>
                        </div>

                        <p className='text-gray-600 font-sans font-medium'>Arriving Fri, May 24</p>
                      
                      </div>

                      

                    </div>
                  </Link>
                ))
                
              ))}
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default MyOrders