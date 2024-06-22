import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Item from './Item';
import new_collections from "../Assets/new_collections"
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Autoplay} from 'swiper/modules'
import axios from '../api/axios';
import { BASE_URL } from '../api/axios';

// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';   
import Loading from './Loading';

const BestSellser = () => {
  const [products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    //api calls
    const fetchProducts=async()=>{
      try {
        setLoading(true);
        const res=await axios.get(`${BASE_URL}/product`,{params:{requiredCount:5}});
        console.log(res);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      } finally{
        setLoading(false);
      }
    }
    fetchProducts();

   // setProducts(new_collections);

    
  },[])
  return (
    <div className='max-w-screen-2xl mx-auto container xl:px-28 px-4 xl:mb-16 mb-4 mt-16  '>
      <div>
        <h2 className='title'>BEST SELLERS</h2>
        {loading?
        <Loading />
        :
        // {/* best sellers products */}
        <div>
        <Swiper
          modules={[Navigation,Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
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
                  <Item item={item} />
              </SwiperSlide>
            ))
          }
          
        </Swiper>
        </div>
      }

      </div>
      
    </div>
  )
}

export default BestSellser
