import React, { useState, useEffect } from 'react'
import Timeline from '../components/Timeline';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { IoCameraOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaAngleRight, FaLocationDot, FaPhone, FaX } from 'react-icons/fa6';
import { SlLocationPin, SlPhone } from 'react-icons/sl';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Loading from '../components/Loading';
import PaymentDetailsCard from '../components/ShippingAddressComponents/PaymentDetailsCard';
import ReactStars from "react-rating-stars-component";
import { toast } from 'react-toastify';

const ratingOptions=[1,2,3,4,5]
//const address={_id:1,nameOfPerson:"Gouri Verma",email:"gouriv2004@gmail.com",phoneNumber:"8199079479",BuildingInfo:"House no 99/1",AreaInfo:"Gali no 2",pinCode:"131001",City:"Sonipat",state:"Haryana",country:"India"};


const OrderProductDetails = () => {
    const axiosPrivate=useAxiosPrivate();
    const {auth,setAuth}=useAuth();
    const location=useLocation();
    const navigate=useNavigate();
    
    const _id=location.pathname.split("/")[2];
    const orderProductId=location.search.split('orderProductId=')[1]

    const [orderDetails,setOrderDetails]=useState(null);
    const [product,setProduct]=useState({});
    const [rating,setRating]=useState(0);
    const [review,setReview]=useState("");
    const [files,setFiles]=useState(null);
    const [loading, setLoading] = useState(false);
    const [showOrderDetails,setShowOrderDetails]=useState(false);

    useEffect(()=>{
        const fetchProduct=async()=>{
            try {
                setLoading(true);
                const res=await axiosPrivate.get(`/order/${_id}`);
                console.log(res.data);
                setOrderDetails(res.data);
                setProduct(res.data.orderItems.find((orderProduct)=>orderProduct._id===orderProductId));

            } catch (error) {
                console.log(error.response.data.error);
            } finally{
                setLoading(false);
              }
        }
        fetchProduct();
        
        // setProduct(data_product[0])
    },[])

    const handleFileChange=(e)=>{
        console.log(e.target.files);    
        setFiles(e.target.files);
    }

    const handleRatingChange=(newRating)=>{
        console.log(newRating);
        setRating(newRating);
    }

    const notifyRating=()=>toast('Rate the product', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });
    const notifyReviewAdded=()=>toast.success('Review Added Successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        
        });

    const handleSubmitReview=async(e)=>{
        e.preventDefault();
        if(rating==0){
            notifyRating();
        }
        else{
            try {
                setLoading(true);
                
                const res=await axiosPrivate.post(`product/review?productId=${product.product}`,{rating,description:review});
                console.log(res.data);

                //make form data for uploading images
                const formdata=new FormData();
                if (files) {
                    for (let i = 0; i < files.length; i++) {
                        formdata.append('files',files[i]); //all uploaded with same field name
                        console.log(files[i]);
                    }

                    const res2=await axiosPrivate.post(`product/review/upload?productId=${product.product}`,formdata);
                    console.log(res2.data);
               
                }

                

            notifyReviewAdded();
            } catch (error) {
                console.log(error);
                if(error.response.status==401){
                    setAuth({});
                    navigate("/login");
                }
                
            }

            finally{
                setLoading(false);
            }
        }
    }


    return (
    <div className='pt-28 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4 min-h-[90vh]'>

    {loading ?
        <Loading />
    :
    
    <div className='flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0'>

        <div className='flex flex-col space-y-3 md:w-1/2'>

            {/* order details and review */}
            <div className='border rounded p-3'>
                {/* order details */}
                <Link to={`/product/${product.product}`} className='flex font-xlato space-x-4 '>
                    
                    {/* image section */}
                    <div className='rounded flex flex-col items-center'>                    
                        <img src={product.image} alt="" className='w-20 h-24 object-cover' />
                    </div>

                    {/* info section */}
                    <div className='flex flex-col space-y-2'>
                        <h2 className='sm:text-lg font-semibold'>{product.name?.slice(0,30)}...</h2>
                        

                        {/* size and quantity option */}
                        <div className='flex text-sm text-gray-400 space-x-4'>
                        <p className='bg-gray-100 rounded-sm px-1'>Size: {product.size}</p>
                        <p className='bg-gray-100 rounded-sm px-1'>Qty: {product.quantity}</p>
                        </div>
                    </div>

                    
                </Link>

                
                
                <h2 className='font-semibold mt-4 text-lg '>Order Details</h2>

                {/* timeline section */}
                <div className='mt-4 ml-8'>
                    
                    <Timeline product={product} orderDetails={orderDetails} />
                </div>

                

                
                {/* review */}
                {
                product.orderStatus=="Delivered" &&
                <form onSubmit={handleSubmitReview}>
                    <h2 className='font-semibold mt-4 text-lg '>Review</h2>
                    <div className='flex flex-col space-y-1 sm:justify-between sm:flex-row'>

                        {/* rating */}
                        <ReactStars
                            count={5}
                            size={30}
                            activeColor="#ffd700"
                            value={rating}
                            onChange={handleRatingChange}
                            
                            
                        />

                        {/* image input */}
                        <label htmlFor='reviewImage' className='w-32 cursor-pointer flex items-center space-x-2 border border-gray-500 p-2 rounded font-xlato text-gray-600'><IoCameraOutline className='w-5 h-5' /><p>Add Photo</p></label>
                        <input multiple type="file" id='reviewImage' className='hidden' onChange={handleFileChange} />
                    </div>
                    

                    <div className='mt-4'>
                        <textarea value={review} 
                        onChange={(e)=>setReview(e.target.value)}
                        className='focus:outline-none border px-2 py-1 rounded w-full' placeholder='Write a review' rows={5} style={{resize:'none'}} />
                    </div>
                    
                    {/* images uploaded */}
                    <div className='flex gap-4 flex-wrap my-4'>
                        {   files && 
                            Object.keys(files).map((keyIndex,index)=>(
                                <div key={index} className='relative'>
                                    <img src={URL.createObjectURL(files[keyIndex])} className='w-20 h-16 sm:w-28 sm:h-24' />
                                    <FaX className='absolute top-2 right-2 text-gray-300' />
                                </div>
                            ))
                        }
                    </div>

                    <button type='submit' className='p-2 font-xlato bg-slate-800 text-white rounded hover:bg-orange-500'>Submit Review</button>
                </form>
                }

                
            </div>
            
            {!showOrderDetails &&

            <div className='border rounded p-3 text-center sm:bg-slate-800 sm:text-white hover:bg-orange-500 bg-white text-gray-800'>
                <button 
                onClick={()=>setShowOrderDetails(true)}
                className='w-full font-semibold sm:text-lg flex items-center sm:justify-center justify-between'>
                    <p>View Order Details</p><FaAngleRight />
                </button>
            </div>
            }
            

           
            
            
        </div>

        <div className='md:w-1/2'>
            {showOrderDetails &&
                <div className='flex flex-col space-y-3 '>
                    
                    {/* products */}
                    <div className='border rounded p-3'>
                        <h2 className='font-semibold text-lg '>Ordered Products</h2>

                        {orderDetails.orderItems.map((product)=>(
                            <div className='flex space-x-4 mt-4' key={product._id}>
                                <img src={product.image} alt="" className='w-20 h-24 object-cover' />

                                <div className='space-y-2'>
                                    <h2 className='sm:text-lg font-semibold'>{product.name?.slice(0,30)}...</h2>
                                    {/* size and quantity option */}
                                    <div className='flex text-sm text-gray-400 space-x-4'>
                                        <p className='bg-gray-100 rounded-sm px-1'>Size: {product.size}</p>
                                        <p className='bg-gray-100 rounded-sm px-1'>Qty: {product.quantity}</p>
                                    </div>

                                    <h2 className='sm:text-lg font-semibold'>₹{product.newPrice}</h2>
                                </div>

                            </div>
                        ))}
                    </div>

                    <div className='border p-3 rounded'>
                        <h2 className='font-semibold text-lg '>Shipping Address</h2>
                        <div className='flex space-y-2 flex-col mt-4'>
                            <h2 className='font-semibold font-xlato '>{orderDetails.shippingDetails.name}</h2>
                            <div>
                            <h2 className='font-semibold text-sm text-gray-800 flex items-center space-x-2'><div><FaLocationDot className='text-slate-700' /></div><div>Address</div></h2>
                            <h3 className='text-gray-400 font-xpoppins'>{orderDetails.shippingDetails.houseAddress + ", "+ orderDetails.shippingDetails.areaAddress + ", " + orderDetails.shippingDetails.city + "-" + orderDetails.shippingDetails.pinCode + ", "+ orderDetails.shippingDetails.state + ", "+orderDetails.shippingDetails.country}</h3>
                            </div>
                            <div>
                            <h2 className='font-semibold text-sm text-gray-800 flex items-center space-x-2'><div className='ml-1'><FaPhone /></div><div>Phone</div></h2>
                            <h3 className='text-gray-400'>{orderDetails.shippingDetails.phone}</h3>
                            </div>
                            
                        </div>
                    </div>

                    {/* payment */}
                    <div className='border rounded p-3'>
                        <h2 className='text-lg font-semibold font-xlato'>Price Details   ({orderDetails.orderItems.length} items)</h2>
                        <div className='flex flex-col space-y-4 flex-1 mt-8'>
                            
                            {/* Details */}
                            <div className='flex justify-between items-center font-xlato'>
                                <h3 className='text-gray-500'>Total MRP</h3>
                                <h3 className=' font-sans'>₹{orderDetails.priceDetails.totalMRP}</h3>
                            </div>
                            {orderDetails.priceDetails.discountOnMRP>0 && 
                            <div className='flex justify-between items-center font-xlato'>
                                <h3 className='text-gray-500 '>Discount on MRP</h3>
                                <h3 className=' font-sans text-green-600'>-₹{orderDetails.priceDetails.discountOnMRP}</h3>
                            </div>
                            }
                            <div className='flex justify-between items-center font-xlato'>
                                <h3 className='text-gray-500 '>Shipping Fee</h3>
                                
                                    {orderDetails.priceDetails.totalAmount>1000?
                                    <h3 className=' font-sans'>
                                    <span className='line-through'>₹100</span><span className=' text-green-600 ml-2'>FREE</span>
                                    </h3>
                                    :
                                    <h3 className=' font-sans'>
                                    <span className=' text-green-600 ml-2'>₹{orderDetails.priceDetails.shippingFee}</span>
                                    </h3>
                                    }
                            
                            </div>
                            <hr />
                            <div className='flex justify-between items-center'>
                                <h3 className='font-semibold font-xlato '>Total Amount</h3>
                                <h3 className=' font-semibold'>₹{orderDetails.priceDetails.totalAmount}</h3>
                            </div>

                            
                        </div>
                    </div>

                </div>


            }
            
        </div>


    </div>
        
    }
    </div>
  )
}

export default OrderProductDetails
