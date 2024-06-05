import React, { useEffect, useState } from 'react'
import all_product from "../Assets/all_product"
import Item from './Item'
import Cards from './Cards'

const Popular = () => {
  const [products,setProducts]=useState([]);
  const [filteredProducts,setfilteredPoducts]=useState([]);
  const [category,setSelectedCategory]=useState("women");

  useEffect(()=>{
    //api calls

    setProducts(all_product);
    const filtered=all_product.filter((item)=>item.category==="women");
    setfilteredPoducts(filtered);
  },[])


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
          <button onClick={()=>filterItems("women")} className={ `border p-2 rounded-sm w-24 ${category==="women" && 'bg-slate-900 text-white'}`}>Women</button>
          <button onClick={()=>filterItems("men")} className={ `border p-2 rounded-sm w-24 ${category==="men" && 'bg-slate-900 text-white'}`}>Men</button>
          <button onClick={()=>filterItems("kid")} className={ `border p-2 rounded-sm w-24 ${category==="kid" && 'bg-slate-900 text-white'}`}>Kids</button>
        </div>

        <Cards filteredProducts={filteredProducts} />
      </div>
      
    </div>
  )
}

export default Popular
