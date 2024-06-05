import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import new_collections from "../Assets/new_collections"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Autoplay} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';   

const BestSellser = () => {
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    setProducts(new_collections);

    
  },[])
  return (
    <div className='max-w-screen-2xl mx-auto container xl:px-28 px-4 xl:mb-16 mb-4 mt-16  '>
      <div>
        <h2 className='title'>BEST SELLERS</h2>

        {/* best sellers products */}
        <div>
        <Swiper
          modules={[Navigation,Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay:2000,
            pauseOnMouseEnter:true
          }}
          
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
            products.map((item)=>(
              <SwiperSlide key={item.id}>
                <div className='rounded-lg border max-h-[450px] max-w-72 mx-auto'>
                  <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt="" className='mx-auto w-full hover:scale-105 transition-all duration-300 max-h-80 object-center' />
                  </Link>

                  <div className='mt-4 px-4'>
                    <h4 className='text-base font-semibold mb-2'>{item.name}</h4>
                    <div className='flex justify-between py-2'>
                      <p className='text-black/50'>ZARA</p>
                      <p className='font-semibold text-lg'>${item.new_price}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
          
        </Swiper>
        </div>


      </div>
      
    </div>
  )
}

export default BestSellser
