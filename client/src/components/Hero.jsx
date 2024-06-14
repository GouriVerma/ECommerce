import React from 'react'
import { FaBagShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import hero_image from "../Assets/hero_image.png"
import ImageHeroCard from './ImageHeroCard'

const Hero = () => {
  return (
    <div className='bg-gradient-to-r from-[#bfb7a269] from-50% to-[#827c6ca9] py-12 xl:px-28 px-4'>

      <div className='py-28 flex flex-col-reverse md:flex-row items-center gap-14 justify-between max-w-screen-2xl mx-auto'>
        <div className='md:w-1/2'>
          <h1 className='text-5xl font-light mb-5'>Collections</h1>
          <p className='text-xl mb-7'>Explore a World of Fashion Possibilities with Exclusive Discounts - Dive into Your Ultimate Style Destination and Elevate Your Wardrobe Today</p>
          <Link to='/shop'><button className='flex justify-center items-center gap-2 px-7 py-3 font-semibold text-lg bg-slate-900 rounded-sm text-white font-xpoppins hover:bg-orange-500'>
           <FaBagShopping className='inline-flex items-center'/>
           Shop Now
           
         </button></Link>
        </div>
        <div className='md:w-1/2'>
          <img src="https://saffronthreadsclothing.com/cdn/shop/files/1_3dfc2536-d7dd-4677-bd83-c6508290d430_1080x1440.jpg?v=1712835053" alt="" className='rounded-ss-[100px] rounded-ee-[100px] w-[500px]' />
        </div>
      </div>

    </div>
  )
}

export default Hero
