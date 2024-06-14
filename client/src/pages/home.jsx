import React, { useContext, useEffect } from 'react'
import Hero from '../components/Hero'
import Popular from '../components/Popular'
import Category from '../components/Category'
import BestSellser from '../components/BestSeller'
import Newsletter from '../components/Newsletter'
import AuthContext from '../Context/AuthProvider'

const Home = () => {
  const {auth}=useContext(AuthContext);
  useEffect(()=>{
    console.log(auth);
  },[])
  return (
    <div className=''>
      <Hero />
      <Category />
      <Popular />
      <BestSellser />
      <Newsletter />
    </div>
  )
}

export default Home
