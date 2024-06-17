import React, { useEffect, useState } from 'react'
import data from "../Assets/data";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdClose, MdDelete } from "react-icons/md";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaMinus, FaPlus, FaStar } from 'react-icons/fa6';






const Cart = () => {
  const axiosPrivate=useAxiosPrivate();
  const {auth,setAuth}=useAuth();
  const navigate=useNavigate();

  

  const [products,setProducts]=useState([]);
  const [totalMRP,setTotalMRP]=useState(0);
  const [discountOnMRP,setDiscountOnMRP]=useState(0);
  const [shippingFee,setShippingFee]=useState(100);
  const [totalAmount,setTotalAmount]=useState(0);
  const [productQuantities, setProductQuantities] = useState({});
  const [productSize, setProductSize] = useState({});
  const [updatedProductId, setUpdatedProductId] = useState(null);

  const CART_ITEMS_URL=`/user/cart/${auth._id}`

  

  const handleUpdateSize =(e,productId)=>{
    setProductSize((prevSizes) => {
      setUpdatedProductId(productId);
      return {
      ...prevSizes,
      [productId]: e.target.value,
    }});


  }

  const handleIncreaseQuantity = (productId) => {
    setProductQuantities((prevQuantities) => {
      setUpdatedProductId(productId);
      return {
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }});



  };

  const handleDecreaseQuantity = (productId) => {
    setProductQuantities((prevQuantities) => {
      setUpdatedProductId(productId);
      return {
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] - 1),
    }});



  };

  const calculateTotals = (products) => {
    const totalMRP = products.reduce((accumulator, product) => {
      return accumulator + product.newPrice;
    }, 0);
    setTotalMRP(totalMRP);

    const discountOnMRP = products.reduce((accumulator, product) => {
      return accumulator + (product.discount * product.oldPrice) / 100;
    }, 0) || 0;
    setDiscountOnMRP(discountOnMRP);

    setTotalAmount(totalMRP - discountOnMRP);

    if(totalAmount>1000){
      setShippingFee(0);
    }
  };

  const handleDeleteItemFromCart = async (productId) => {
    try {
      const res = await axiosPrivate.delete(`${CART_ITEMS_URL}?cartProductId=${productId}`);
      setProducts(res.data.cart);
      calculateTotals(res.data.cart);
      setAuth((prev)=>({...prev,cartItemsCount:res.data.cart.length}));
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const updateCartItem=async (productId)=>{
    try {
      
      const res=await axiosPrivate.put(`/user/cart/${auth._id}?cartProductId=${productId}`,{size:productSize[productId],quantity:productQuantities[productId]});
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  useEffect(()=>{

    //api calls
    const fetchCartItems=async()=>{
      try {
        const res=await axiosPrivate.get(CART_ITEMS_URL);
        console.log(res.data);
        setProducts(res.data);
        calculateTotals(res.data);
        setAuth((prev)=>({...prev,cartItemsCount:res.data.length}));
        setProductQuantities(res.data.reduce((acc, product) => ({ ...acc, [product._id]: product.quantity }), {}))
        setProductSize(res.data.reduce((acc, product) => ({ ...acc, [product._id]: product.size }), {}))
      } catch (error) {
        console.log(error.response.data.error);
      }
    }

    fetchCartItems();
    
  },[])

  useEffect(()=>{
   if(updatedProductId){
    updateCartItem(updatedProductId)
   }
  },[productQuantities,productSize])


  


  return (
    <div className='pt-24 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>
      <div className='flex flex-col xl:space-x-28 lg:space-x-12 lg:flex-row'>

        {/* product list */}
        <div className='space-y-3 lg:w-3/5'>
          {
          products.map((product)=>(
            <div key={product._id} className='flex font-xlato border rounded p-3 space-x-4'>

              {/* image section */}
              <div className='rounded sm:w-28 sm:h-36 w-16 h-24 flex items-center'>
                <img src={product.image} alt="" className='w-full h-full object-cover' />
              </div>

              {/* info section */}
              <div className='flex flex-col space-y-1 sm:space-y-[6px]'>
                <h2 className='sm:text-lg font-semibold text-gray-700'>{product.name}</h2>
                <div className='flex gap-4 items-center'>
                  <p className='text-sm font-semibold text-gray-300'>{product.brand}</p>
                  <p className='text-sm flex items-center gap-1 font-xlato'><FaStar className='text-yellow-400' />{product.avgRating}</p>  
                </div>

                {/* size and cart option */}
                <div className='flex items-center gap-4 sm:gap-12'>
                  <div className='flex items-center space-x-1'>
                    <FaMinus className='bg-gray-200 text-gray-500 sm:p-[6px] sm:w-[26px] sm:h-[26px] p-[3px] w-[18px] h-[18px] cursor-pointer' onClick={()=>handleDecreaseQuantity(product._id)} />
                    <input type="text" className=' focus:outline-none border px-2 py-[1px] text-center text-gray-700 p-[3px] w-10 h-[18px] sm:h-[26px]' value={productQuantities[product._id]} disabled />
                    <FaPlus className='bg-gray-200 text-gray-500 sm:p-[6px] sm:w-[26px] sm:h-[26px] p-[3px] w-[18px] h-[18px] cursor-pointer' onClick={()=>handleIncreaseQuantity(product._id)} />
                  </div>
                  <div className='flex items-center'>
                    <label htmlFor="" className='text-gray-500 mr-2 sm:text-lg'>Size</label>
                    <select value={productSize[product._id]} onChange={(e)=>handleUpdateSize(e,product._id)} className='border-gray-300 rounded-sm py-0 sm:py-1 text-sm focus:border-gray-600 focus:ring-0'>
                      <option>XS</option>
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                      <option>XXL</option>
                    </select>
                  </div>
                </div>

                <p className='font-semibold sm:text-lg text-gray-700'>₹{product.newPrice} 
                {product.oldPrice && <span className='line-through text-gray-400 ml-2 font-medium'>₹{product.oldPrice}</span>}
                {product.discount && <span className='text-green-700 text-base ml-1'>({product.discount})</span>}
                </p>
                <div className='flex sm:space-x-4 space-x-1'>
                  {/* <button className='flex items-center gap-1 text-slate-900 border border-slate-900 py-1 px-2 rounded-sm text-sm sm:text-base'><FaRegHeart />Move to Wishlist</button> */}
                </div>
              </div>

              {/* cross button */}
              <div className='flex flex-1'  >
                <p className='flex justify-end flex-1' ><MdClose className='h-5 w-5 text-gray-600 cursor-pointer' onClick={()=>handleDeleteItemFromCart(product._id)} /></p>
              </div>

            </div>
          ))}
        </div>


        {/* total amount */}
        <div className='flex flex-col space-y-4 flex-1 mt-12'>
          <h2 className='font-semibold font-xlato md:text-xl tracking-wide'>PRICE DETAILS   ({products.length} items)</h2>
          {/* Details */}
          <div className='flex justify-between items-center font-xlato'>
            <h3 className='text-gray-500 lg:text-lg'>Total MRP</h3>
            <h3 className='lg:text-lg'>₹{totalMRP}</h3>
          </div>
          <div className='flex justify-between items-center font-xlato'>
            <h3 className='text-gray-500 lg:text-lg'>Discount on MRP</h3>
            <h3 className='lg:text-lg text-green-600'>-₹{discountOnMRP}</h3>
          </div>
          <div className='flex justify-between items-center font-xlato'>
            <h3 className='text-gray-500 lg:text-lg'>Shipping Fee</h3>
            
              {totalAmount>1000?
                <h3 className='lg:text-lg'>
                <span className='line-through'>₹100</span><span className=' text-green-600 ml-2'>FREE</span>
                </h3>
              :
                <h3 className='lg:text-lg'>
                <span className=' text-green-600 ml-2'>{shippingFee}</span>
                </h3>
              }
           
          </div>
          <hr />
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold font-xlato md:text-xl'>Total Amount</h3>
            <h3 className='lg:text-lg font-semibold'>₹{totalAmount}</h3>
          </div>

          <button className='bg-slate-900 text-white py-2 lg:text-lg tracking-wide font-semibold rounded-sm' onClick={()=>navigate(`/place-order/shipping-address/${auth._id}`,{state:{'products':products,'orderInfo':{totalMRP,discountOnMRP,totalAmount,shippingFee}}})}>PLACE ORDER</button>
        </div>
      </div>
      
    </div>
  )
}

export default Cart
