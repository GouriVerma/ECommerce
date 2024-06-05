import React from 'react'
import Hero from '../components/Hero'
import Popular from '../components/Popular'
import Category from '../components/Category'
import BestSellser from '../components/BestSeller'
import Newsletter from '../components/Newsletter'

const Home = () => {
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
