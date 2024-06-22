import React, { useEffect, useState } from 'react'
import all_product from "../Assets/all_product"
import Item from './Item'
import Cards from './Cards'
import axios from '../api/axios'
import { BASE_URL } from '../api/axios'
import Loading from './Loading'

const Popular = () => {
  const [products,setProducts]=useState([]);
  const [filteredProducts,setfilteredPoducts]=useState([]);
  const [category,setCategory]=useState("women");
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    //api calls
    const fetchProducts=async()=>{
      try {
        setLoading(true);
        const res=await axios.get(`${BASE_URL}/product?gender=${category}`,{params:{requiredCount:3}});
        console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchProducts();

    
    
  },[category])

  


  //filtering
  const filterItems=(category)=>{
    const filtered=all_product.filter((item)=>item.category===category)
    setfilteredPoducts(filtered);
    setSelectedCategory(category);

  }


  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-28 px-4 mb-8'>
      <h1 className='title'>POPULARS</h1>

      {/* product cards */}
      <div className=''>

        {/* filters */}
        <div className="flex flex-row justify-start md:items-center md:gap-12 gap-4 mb-6 text-lg font-xpoppins ">
          <button onClick={()=>setCategory("women")} className={ `border p-2 rounded-sm w-24 ${category==="women" && 'bg-slate-900 text-white'}`}>Women</button>
          <button onClick={()=>setCategory("men")} className={ `border p-2 rounded-sm w-24 ${category==="men" && 'bg-slate-900 text-white'}`}>Men</button>
          <button onClick={()=>setCategory("kids")} className={ `border p-2 rounded-sm w-24 ${category==="kids" && 'bg-slate-900 text-white'}`}>Kids</button>
        </div>

        {loading?
          <Loading />
          :
          <Cards filteredProducts={products} />
        }
      </div>
      
    </div>
  )
}

export default Popular
