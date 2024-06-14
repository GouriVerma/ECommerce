import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart,FaRegHeart, FaStar, FaUser } from "react-icons/fa";
import all_product from '../Assets/all_product';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Autoplay} from 'swiper/modules';
import axios from '../api/axios';
import { toast } from 'react-toastify';


// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';  

// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';  
import Item from '../components/Item';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';



const availableSizes=["S","M","L","XL","XXL"];


const Product = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth,setAuth}=useAuth();
  const location=useLocation();
  const navigate=useNavigate();
  

  const ADD_TO_CART_URL=`/user/cart/${auth._id}`

  const [product,setProduct]=useState({});
  const [activeImage,setActiveImage]=useState(0);
  const [selectedSize,setSelectedSize]=useState("");
  const [addedToWishlist,setAddedToWishlist]=useState(false);
  const [similarProducts,setSimilarproducts]=useState([]);
  const _id=location.pathname.split("/")[2];


  const addToCartNotify=()=>  toast.success('Added to Cart', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
    });

    const selectSizeNotify=()=>toast('Select Size', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });


  useEffect(()=>{
    
    const fetchProduct=async()=>{
      console.log(auth);
      const res=await axios.get(`/product/${_id}`);
      console.log(res);
      // setProduct(productDetails);
      setProduct(res.data);
    }
    fetchProduct();
    setSimilarproducts(all_product);
  },[])

  const toggleAddToWishList=()=>{
    setAddedToWishlist(!addedToWishlist)
  }

  const addToCart=async()=>{
    //add to Cart by api
    if(!auth.userName){
      navigate("/login",{state:{from:location}});
    }
    else{
      if(selectedSize){
        try {
          
          const res=await axiosPrivate.post(ADD_TO_CART_URL,{name:product.name,image:product.images[0].url,newPrice:product.newPrice,oldPrice:product.oldPrice,discount:product.discount,size:selectedSize,product:product._id,brand:product.brand,avgRating:product.avgRating})
          console.log(res.data);
          setAuth((prev)=>({...prev,cartItemsCount:res.data.length}));
          addToCartNotify();
        } catch (error) {
          console.log(error.response.data.error);
        }
        
      }
      else{
        selectSizeNotify();
      }
      
    }
    
  }

  

  return (
     
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4 min-h-screen'>
      <div className='flex flex-col gap-12'>

        {/* image and details */}
        <div className='flex lg:flex-row flex-col justify-between items-center'>

          {/* image section */}
          <div className='flex flex-col-reverse sm:flex-row justify-between lg:w-1/2 gap-8 '>

            {/* Side Images */}

            <div
                style={{ maxWidth: "95vw", height: "100px" }}
                className='sm:hidden flex gap-4'
                
            >
              
                {product.images && product.images.map((image, index) => (
                    
                  <img src={image.url} key={image._id} alt="" className={`w-20 h-24 rounded object-cover ${index===activeImage && "border-2 border-slate-900"}`} onClick={()=>setActiveImage(index)}  />
                    
                ))}
            </div>



            <div className='flex-row sm:flex-col gap-4 hidden sm:flex'>
              {product.images && 
                product.images.map((image,index)=>(
                  <img src={image.url} className={`w-32 h-40 rounded object-cover  ${index===activeImage && "border-2 border-slate-900"}`} onClick={()=>setActiveImage(index)} />
                  
                ))
              }
            </div>
            <div>
            <img src={product.images && product.images[activeImage] && product.images[activeImage].url} alt="" className='sm:w-[500px] sm:h-[690px] w-[460px] h-[520px] rounded object-cover' />
            </div>
          </div>

          {/* Details section */}
          <div className='lg:w-1/2 flex flex-col lg:pl-12 gap-4 max-w-[690px] mt-8 lg:mt-0 font-xlato text-gray-700'>
            <h2 className='sm:text-4xl text-3xl font-semibold '>{product.name}</h2>
            <p className=' text-gray-500'>{product.smallDesc}</p>
            <p className='sm:text-3xl text-2xl font-semibold'>₹{product.newPrice} 
              {product.oldPrice && <span className='font-normal line-through ml-2 text-gray-400'>₹{product.oldPrice}</span>}
              {product.discount && <span className='font-xpoppins ml-4 text-2xl text-green-700'>({product.discount}%)</span>}
            </p>
            <p className='sm:text-xl text-lg mt-2 '>SELECT SIZE</p>
            <div className='flex gap-4'>
              {availableSizes.map((size,index)=>(
                <button key={index} className={`text-lg border rounded-full border-gray-700 w-12 h-12 ${selectedSize===size && "bg-slate-900 text-white"}`} onClick={()=>setSelectedSize(size)}>{size}</button>
              ))}
            </div>
            <div className='flex gap-4 mt-4'>
              <button className='bg-slate-900 text-white sm:px-4 px-2 py-3 text-lg rounded w-3/5 hover:bg-orange-500' onClick={addToCart}>Add to Cart</button>
              
              <button className='sm:px-4 px-2 py-3 text-lg rounded border border-slate-900 w-2/5' onClick={toggleAddToWishList}>
                {addedToWishlist? <FaHeart className='inline-flex w-6 h-6 mr-2' /> : <FaRegHeart className='inline-flex w-6 h-6 mr-2' />}
                Wishlist</button>
            </div>
          </div>
        </div>


        {/* description */}
        <div className='font-xlato'>
          <h2 className='sm:text-xl text-lg font-semibold text-gray-800 mb-2'>Description</h2>
          <hr />
          <p className='text-gray-500 sm:text-lg mt-4 font-sans'>{product.desc}</p>
        </div>

        {/* similar products */}
        {/* <div className='font-xlato'>
        <h2 className='text-xl font-semibold text-gray-800 mb-2'>Similar Products</h2>
        <hr className='mb-2' />
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
          
          breakpoints={{
            640: {
              slidesPerView:2,
              spaceBetween:20
            },
            768: {
              slidesPerView:3,
              spaceBetween:40
            },
            1024: {
              slidesPerView:4,
              spaceBetween:50
            }
          }}
          navigation={{
            enabled:true
          }}
          
        >
          {
            all_product.map((item)=>(
              <SwiperSlide key={item.id}>
                <Item item={item} />
              </SwiperSlide>
            ))
          }
          
        </Swiper>
        </div> */}

        {/* reviews section */}
        <div>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>Reviews ({product.numOfReviews})</h2>
          <hr className='mb-2' />
          {product.reviews && 
            product.reviews.map((review)=>(
              <div className='flex flex-col font-xlato border-b sm:py-4 py-3'>
                <h3 className='sm:text-lg font-semibold flex gap-2 items-center mb-2'><FaUser className=' text-gray-700 rounded-full bg-gray-300 p-1 w-6 h-6' />{review.createdByName}</h3>
                <div className='flex gap-3'><span className='flex items-center text-white bg-slate-900 w-10 py-[2px] px-[6px] rounded-xl gap-1'>{review.rating}<FaStar className='' /></span><p className='sm:text-lg text-gray-800'>{review.ratingDescription}</p></div>
                <p className='mt-1 text-gray-600'>{review.description}</p>
              </div>
            ))
          }
        </div>


      </div>
    </div>
  )
}

export default Product
