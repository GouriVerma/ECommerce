import React from 'react'

const instaPictures=[
  {href:"",image:"https://stylecaster.com/wp-content/uploads/2017/07/nikita-wong-june-2016.jpg"},
  {href:"",image:"https://i.pinimg.com/564x/a2/d7/a1/a2d7a1a099e471c57c62cb17e7e83d2c.jpg"},
  {href:"",image:"https://i.pinimg.com/originals/d3/71/e6/d371e69991affcb72aebf16d4b866839.jpg"},
  {href:"",image:"https://glaminati.com/wp-content/uploads/2022/05/grunge-style-jeans-top-naughty.jpg"},
  {href:"",image:"https://www.bhmpics.com/downloads/90s-grunge-aesthetic/31.f431886bac4d761e61d04e5a67a26e68.jpg"},
  {href:"",image:"https://lifestylebyps.com/cdn/shop/articles/Untitled_design_3_993ecf16-9a98-45d9-906d-cdf508ea4259_800x.jpg?v=1545291005"},
  
]

const Newsletter = () => {
  return (
    <div className='bg-[#1E2832] bg-opacity-5 xl:px-28 px-4 py-16'>
      <h2 className='title mb-8'>Follow for Products and Discounts on Instagram</h2>

      {/* insta grid */}
      <div className='flex flex-wrap gap-4 items-center justify-center mb-20'>
        {instaPictures.map((item)=>(
          
            <img src={item.image} alt="" className='md:w-52 md:h-72 w-40 h-52 object-cover hover:scale-105 transition-all duration-300 ' />
          
        ))}
      </div>

      
    </div>
  )
}

export default Newsletter
