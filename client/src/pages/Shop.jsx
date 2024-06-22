import React, { useEffect, useState } from 'react'
import all_product from '../Assets/all_product'
import Item from '../components/Item';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';  
import { RiFilter3Fill } from "react-icons/ri";
import { MdClose } from 'react-icons/md';
import axios from 'axios'
import { BASE_URL } from '../api/axios';
import Loading from '../components/Loading';


const categories=["Tshirt","Jacket","Jeans"];
const colors=["black","gray","red","teal","pink","blue"]


const Shop = ({gender}) => {
  const [products,setProducts]=useState([]);
  const [activeColor,setActiveColor]=useState("");
  const [valueRange,setValueRange]=useState([0,5000]);
  const [activeFilterForMobile,setActiveilterForMobile]=useState("Category");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openFilter,setOpenFilter]=useState(false);
  const [loading, setLoading] = useState(false);

  const clearfilters=()=>{
    setActiveColor("");
    setValueRange([0,5000]);
    setSelectedCategory("");
    setActiveilterForMobile("Category");
  }

  const handleFilterInMobile=()=>{
    setOpenFilter(false);

    //api calls for filtering
  }

  useEffect(()=>{
    let link=`${BASE_URL}/product?newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}`
    if(selectedCategory && activeColor && gender!==undefined){
      link=`${BASE_URL}/product?category=${selectedCategory}&color=${activeColor}&newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}&gender=${gender}`;
    }
      
    else if(selectedCategory && gender!==undefined){
      link=`${BASE_URL}/product?category=${selectedCategory}&newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}&gender=${gender}`;
    }
    else if(activeColor && gender!==undefined){
      link=`${BASE_URL}/product?color=${activeColor}&newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}&gender=${gender}`;
    }
    else if(selectedCategory && activeColor){
      link=`${BASE_URL}/product?category=${selectedCategory}&color=${activeColor}&newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}`;
    }
    else if(gender!==undefined){
      link=`${BASE_URL}/product?newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}&gender=${gender}`;
    }
    else if(selectedCategory){
      link=`${BASE_URL}/product?category=${selectedCategory}&newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}`;
    }
    else if(activeColor){
      link=`${BASE_URL}/product?color=${activeColor}&newPrice[gt]=${valueRange[0]}&newPrice[lt]=${valueRange[1]}`
    }
    console.log(link);
    const fetchProducts=async()=>{
      try {
        setLoading(true);
        const res=await axios.get(link);
        console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchProducts();
  },[selectedCategory,activeColor,valueRange,gender])


  return (
    <div className='pt-16 pb-12 max-w-screen-2xl mx-auto container xl:px-28 px-4'>

      {loading?
      <Loading />
      :
      <div>

        {/* filters button */}
        <div className='lg:hidden block w-full p-4'>
          <button 
          onClick={()=>setOpenFilter(true)}
          className='flex lg:hidden items-center space-x-2 border border-slate-900 py-1 px-3 rounded'><RiFilter3Fill /><h2 className='sm:text-lg font-xlato'>Filters</h2></button>
          <hr className='mt-2' />
        </div>

        {/* filters pop up */}
        {
        <div className={`transition-all duration-500 lg:hidden block px-3 py-6 z-10 w-[92vw] h-[95vh] rounded absolute bottom-[2px] top-16 bg-white shadow-inner mx-auto ${openFilter?"translate-x-0":"-translate-x-[95vw]"}`}>

          {/* close button */}
          <button 
          onClick={()=>setOpenFilter(false)}
          className='border absolute right-2  border-slate-900 rounded-full p-1'><MdClose className='w-6 h-6 ' /></button>
          
          
          <div className='flex h-[750px] sm:space-x-4 space-x-2'>

            {/* left section */}
            <div className='w-2/5 flex flex-col items-start font-xpoppins h-full border-l border-r border-t border-gray-200 rounded'>
              <button className={` ${activeFilterForMobile==="Category" && "bg-slate-900 text-white"} w-full sm:px-6 px-3 py-3 border-b border-gray-200`}
                onClick={()=>setActiveilterForMobile("Category")}
              >Category</button>
              <button className={` ${activeFilterForMobile==="Colors" && "bg-slate-900 text-white"} w-full sm:px-6 px-3 py-3 border-b border-gray-200`}
              onClick={()=>setActiveilterForMobile("Colors")}
              >Colors</button>
              <button className={` ${activeFilterForMobile==="Price Range" && "bg-slate-900 text-white"} w-full sm:px-6 px-3 py-3 border-b border-gray-200`}
              onClick={()=>setActiveilterForMobile("Price Range")}
              >Price Range</button>
            </div>

            {/* right section */}
            <div className='w-3/5 mt-2'>
              {
              activeFilterForMobile==="Category" ? 
              //category section
              <div className='flex flex-col space-y-3 ml-4 mt-4 text-gray-500'>
              {
                categories.map((category,index)=>(
                  <div>
                    <input 
                    type='radio'
                    id={category}
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    />
                    <label className='font-xpoppins text-gray-600 ml-2 '>{category}</label>
                  </div>
                ))
              }
              </div>
              
              : activeFilterForMobile==="Colors" ? 

              // color section
              <div className='mt-8 sm:px-8 px-[20px]'>
                
                <div className='flex gap-3 flex-wrap'>
                  {colors.map((color, index) => (
                    <div
                      onClick={()=>setActiveColor(color)}
                      key={index}
                      className={`w-16 h-8 border rounded-full text-white ${color=='black' && "bg-black"} ${color=='gray' && "bg-gray-100"} ${color=='teal' && "bg-teal-700"} ${color=='pink' && "bg-pink-600"} ${color=='blue' && "bg-blue-600"} ${color=='red' && "bg-red-600"}
                      ${activeColor==color && "border-2 border-slate-900 w-[66px] h-10"}
                      `}
                      
                    >
                      
                    </div>
                  ))}
                </div>
              </div>
              : 
              // price section
              <div className='mt-8 sm:px-8 px-[20px]'>
                <Slider range min={100} max={5000} defaultValue={[1500,3500]} pushable={500} value={valueRange} onChange={(value)=>setValueRange(value)} marks={{100:'Rs.100',5000:'Rs.5000'}} />
                <div className='flex mt-8'>
                  <div className='flex p-1 items-center h-[40px]'>
                    <h3 className='border font-semibold h-full p-1'>Min</h3>
                    <input value={valueRange[0]} type="number" min={100} max={5000} className='w-16 focus:outline-none border p-1 h-full' onChange={(e)=>setValueRange([parseInt(e.target.value),valueRange[1]])} />
                  </div>
                  <div className='flex items-center justify-center text-lg'>-</div>
                  <div className='flex p-1 items-center h-[40px]'>
                    <h3 className='border font-semibold h-full p-1'>Max</h3>
                    <input value={valueRange[1]} type="number" min={100} max={5000} className='w-16 focus:outline-none border p-1 h-full' onChange={(e)=>setValueRange([valueRange[0],parseInt(e.target.value)])} />
                  </div>
                </div>
              </div>
              }
            </div>
          </div>
          <div className='flex justify-between font-xlato'>
            <button className='border border-slate-900 rounded-sm px-4 py-2' onClick={()=>clearfilters()}>Clear Filters</button>
            <button className='border border-slate-900 text-white bg-slate-900 rounded-sm px-4 py-2'
            onClick={()=>handleFilterInMobile()}
            >Apply filters</button>
          </div>
        </div>
        }
        
        {/* filters for large screens */}
        <div className='flex mt-12'>

          {/* filters section */}
          <div className='w-1/4 lg:flex flex-col hidden font-xlato mr-8'>
            <h2 className='text-lg font-semibold'>Filters</h2>
            
            {/* category section */}
            <div className='border-y py-6 '>
              <h2 className='text-gray-700 font-semibold mb-2'>Category</h2>
              <div className='flex flex-col space-y-3'>
              {
                categories.map((category,index)=>(
                  <h3 onClick={()=>{setSelectedCategory(category)
                    console.log(category);
                  }} className='font-sans text-gray-600 cursor-pointer '>{category}</h3>
                ))
              }
              </div>
            </div>

            {/* colors section */}
            <div className='border-b py-6'>
              <h2 className='text-gray-700 font-semibold mb-2'>Colors</h2>
              <div className='flex space-x-3'>
                {colors.map((color, index) => (
                  <div
                    onClick={()=>setActiveColor(color)}
                    key={index}
                    className={`w-5 h-5 border rounded-full ${color=='black' && "bg-black"} ${color=='gray' && "bg-gray-100"} ${color=='teal' && "bg-teal-700"} ${color=='pink' && "bg-pink-600"} ${color=='blue' && "bg-blue-600"} ${color=='red' && "bg-red-600"}
                      ${activeColor==color && "border-2 border-slate-900 w-6 h-6"}
                    `}
                    
                  ></div>
                ))}
              </div>
            </div>

            {/* price filter */}
            <div className='border-b py-6'>
              <h2 className='text-gray-700 font-semibold mb-2'>Price Filter</h2>
              <Slider range min={100} max={5000} defaultValue={[1500,3500]} pushable={500} value={valueRange} onChange={(value)=>setValueRange(value)} marks={{100:'Rs.100',5000:'Rs.5000'}} />
              <div className='flex mt-8'>
                <div className='flex w-1/2 p-1 items-center h-[40px]'>
                  <h3 className='border font-semibold h-full p-1'>Min</h3>
                  <input value={valueRange[0]} type="number" min={100} max={5000} className='w-16 focus:outline-none border p-1 h-full' onChange={(e)=>setValueRange([parseInt(e.target.value),valueRange[1]])} />
                </div>
                <div className='flex items-center justify-center text-lg'>-</div>
                <div className='flex w-1/2 p-1 items-center h-[40px]'>
                  <h3 className='border font-semibold h-full p-1'>Max</h3>
                  <input value={valueRange[1]} type="number" min={100} max={5000} className='w-16 focus:outline-none border p-1 h-full' onChange={(e)=>setValueRange([valueRange[0],parseInt(e.target.value)])} />
                </div>
              </div>

              
            </div>
            <button className='mt-4 py-3 rounded-sm hover:bg-orange-500 bg-slate-900 text-white' onClick={clearfilters}>Clear Filters</button>
          </div>
          
          {products.length>0 ?

          //products section
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-4 gap-2 mx-auto'>
            {
              products.map((product)=>(
                <Item key={product._id} item={product} />
              ))
            }
          </div>

          :
              <div className='flex items-center flex-col space-y-4'>
                <img className='object-cover sm:w-[768px] sm:h-auto ' src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127823.jpg?t=st=1718801791~exp=1718805391~hmac=80179e71ddf7c7a28634e5b3d1f2ae0c34c780acfd83b931aead35d749229f4a&w=1380" alt="" />
                <h1 className='sm:text-3xl text-2xl font-xlato font-semibold text-slate-800'>No results :(</h1>
              </div>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default Shop
