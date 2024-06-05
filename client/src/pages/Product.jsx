import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Autoplay} from 'swiper/modules'

// Import Swiper styles
import 'swiper/css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';  

const images=[
  {link: "https://assets.ajio.com/medias/sys_master/root/20240406/XGvL/6610dc8616fd2c6e6aa17b93/-473Wx593H-466855053-yellow-MODEL3.jpg"},
  {link: "https://assets.ajio.com/medias/sys_master/root/20240406/jTor/6610dc8616fd2c6e6aa17c06/-473Wx593H-466855053-yellow-MODEL.jpg"},
  {link: "https://brandedcountrywear.com/cdn/shop/files/18580717_b9327fef-705f-4522-851d-a1b872cf6eea.jpg?v=1685638184&width=1200"},
  {link: "https://pimg.bucklecontent.com/images/products/19465BJWD00225/MOS/f/e50d05004576fb0f619b9526058e16f5v3?quality=0.8&width=845"},

]

const Product = () => {
  return (
    <div className='pt-24 max-w-screen-2xl mx-auto container xl:px-28 px-4 min-h-screen'>
      <div>
        <div className='flex lg:flex-row flex-col justify-between items-center'>

          {/* image section */}
          <div className='flex flex-col-reverse sm:flex-row justify-between lg:w-1/2 gap-8 '>

            {/* Side Images */}

            <Swiper
                style={{ maxWidth: "95vw", height: "100px" }}
                className='sm:hidden'
                spaceBetween={1}
                slidesPerView={4}
            >
              
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image.link} alt="" className='w-20 h-24 rounded object-cover' />
                    </SwiperSlide>
                ))}
            </Swiper>



            <div className='flex-row sm:flex-col gap-4 hidden sm:flex'>
              {
                images.map((image)=>(
                  <img src={image.link} key={image.link} className='sm:w-32 sm:h-40 w-20 h-24 rounded object-cover' />
                ))
              }
            </div>
            <div>
            <img src="https://assets.ajio.com/medias/sys_master/root/20240406/XGvL/6610dc8616fd2c6e6aa17b93/-473Wx593H-466855053-yellow-MODEL3.jpg" alt="" className='sm:w-[500px] sm:h-[690px] w-[460px] h-[520px] rounded object-cover' />
            </div>
          </div>

          {/* Details section */}
          <div className='lg:w-1/2 flex items-center'>
            Details
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
