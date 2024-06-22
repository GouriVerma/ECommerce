import React from 'react'
import summerCategory from "../images/summerCategory.png"
import summerMen from "../images/summerMen.png"
import womenEthnic from "../images/womenEthnic.png"
import menSectionCategory3 from '../images/menSectionCategory3.png'
import womenSection from '../images/womenSection.png'
import kidsSection from '../images/kidsSection.png'
import kidsSection2 from '../images/kidsSection2.png'
import kidsSection3 from '../images/kidsSection3.png'
import {FaArrowRight} from "react-icons/fa6"
import { Link } from 'react-router-dom'

const companyLogos=[
    {id:1,imgUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/2560px-Zara_Logo.svg.png"},
    {id:2,imgUrl:"https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"},
    {id:3,imgUrl:"https://upload.wikimedia.org/wikipedia/commons/c/c5/Shein_Logo_2017.svg"},
    {id:4,imgUrl:"https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"},
]

const Category = () => {
  return (
    <div className='max-w-screen-2xl mx-auto xl:px-28 px-4 container py-28 flex-wrap'>
      
      {/* brand logos */}
      <div className='flex items-center justify-around gap-3 py-5 flex-wrap'>
        {
            companyLogos.map(({id,imgUrl})=>(
                <div key={id} className='w-28 h-28 flex items-center'>
                    <img src={imgUrl} alt="" className='' />
                </div>
            ))
        }
      </div>

      <div className='py-8'>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">



            {/* first col */}
            <Link to={`/kids`} className='hover:scale-105 transition-all duration-300 col-span-1 group font-xpoppins py-10 pl-5 bg-gradient-to-br from-[#aec8cf] text-slate-900 rounded-3xl flex items-end relative sm:h-[320px] h-[250px] overflow-hidden'>
              <div>
                <div className='mb-4'>
                  <p className='text-2xl font-semibold font-xpoppins'>Kids</p>
                  {/* <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Women</p>   */}
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Collection</p>
                  <div className='hidden lg:block w-[500px] h-[500px] absolute scale-0 -translate-x-36 -translate-y-80  transition-all duration-500  rounded-full bg-[#eee9e965] group-hover:scale-100'></div>
                </div>
                <div className='absolute bottom-0 -right-12 sm:-right-24 flex sm:-space-x-36 -space-x-16'>
                  <img src={kidsSection3} alt="" className='sm:w-[220px] w-[120px] h-[280px] sm:h-auto object-cover' />
                  <img src={kidsSection2} alt="" className='sm:w-[220px] w-[150px] h-[280px] sm:h-auto object-cover' />
                </div>
                <button className='lg:translate-y-24 lg:group-hover:translate-y-0 bg-slate-900 px-4 py-2 rounded-sm text-white font-xpoppins transition-all duration-500 z-20 cursor-pointer'>Shop Now <FaArrowRight className='inline-flex bg-white text-slate-900 rounded-full p-1 w-5 h-5' /></button>

              </div>
              
            </Link>

            {/* second col */}
            <Link to={`/men`} className='hover:scale-105 transition-all duration-300 col-span-1 group font-xpoppins py-10 pl-5 bg-gradient-to-br from-[#aec8cf] text-slate-900 rounded-3xl flex items-end relative sm:h-[320px] h-[250px] overflow-hidden'>
              <div>
                <div className='mb-4'>
                  <p className='text-2xl font-semibold font-xpoppins'>Men</p>
                  {/* <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Women</p>   */}
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Collection</p>
                  <div className='hidden lg:block w-[500px] h-[500px] absolute scale-0 -translate-x-36 -translate-y-80  transition-all duration-500  rounded-full bg-[#eee9e965] group-hover:scale-100'></div>
                </div>
                <img src={menSectionCategory3} alt="" className='sm:w-[550px] sm:h-[360px] absolute bottom-0 -right-16 object-cover' />
                <button className='lg:translate-y-24 lg:group-hover:translate-y-0 bg-slate-900 px-4 py-2 rounded-sm text-white font-xpoppins transition-all duration-500 z-20 cursor-pointer'>Shop Now <FaArrowRight className='inline-flex bg-white text-slate-900 rounded-full p-1 w-5 h-5' /></button>

              </div>
              
            </Link>

            {/* third col */}
            <Link to={`/women`} className='hover:scale-105 transition-all duration-300 md:col-span-2 group font-xpoppins py-10 pl-5 bg-gradient-to-br from-[#aec8cf] text-slate-900 rounded-3xl flex items-end relative sm:h-[320px] h-[250px] overflow-hidden'>
              <div>
                <div className='mb-4'>
                  <p className='text-2xl font-semibold font-xpoppins'>Women</p>
                  {/* <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Women</p>   */}
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Collection</p>
                  <div className='hidden lg:block w-[800px] h-[800px] absolute scale-0 -translate-x-36 -translate-y-80  transition-all duration-500  rounded-full bg-[#eee9e965] group-hover:scale-100'></div>
                </div>
                <div className='absolute bottom-0 -right-16 flex sm:-space-x-32 -space-x-28'>
                  <img src={womenSection} alt="" className='sm:w-[220px] w-[180px] object-cover' />
                  <img src={summerCategory} alt="" className='sm:w-[220px] w-[180px] object-cover' />
                </div>
                
                <button className='lg:translate-y-24 lg:group-hover:translate-y-0 bg-slate-900 px-4 py-2 rounded-sm text-white font-xpoppins transition-all duration-500 z-20 cursor-pointer'>Shop Now <FaArrowRight className='inline-flex bg-white text-slate-900 rounded-full p-1 w-5 h-5' /></button>

              </div>
              
            </Link>

            {/* fourth col */}
            {/* <div className='hover:scale-105 transition-all duration-300 md:col-span-2 group font-xpoppins py-10 pl-5 bg-gradient-to-br from-[#aec8cf] text-slate-900 rounded-3xl flex items-end relative sm:h-[320px] h-[250px] overflow-hidden'>
              <div>
                <div className='mb-4'>
                  <p className='text-2xl font-semibold font-xpoppins'>Ethnic</p>
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Men</p>  
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Collection</p>
                  <div className='hidden lg:block w-[600px] h-[600px] absolute scale-0 -translate-x-36 -translate-y-80  transition-all duration-500  rounded-full bg-[#eee9e965] group-hover:scale-100'></div>
                </div>
                <img src={summerCategory} alt="" className='w-[250px] absolute bottom-0 -right-16' />
                <button className='lg:translate-y-24 lg:group-hover:translate-y-0 bg-slate-900 px-4 py-2 rounded-sm text-white font-xpoppins transition-all duration-500 z-20 cursor-pointer'>Shop Now <FaArrowRight className='inline-flex bg-white text-slate-900 rounded-full p-1 w-5 h-5' /></button>

              </div>
              
            </div> */}

            {/* fifth col */}
            {/* <div className='hover:scale-105 transition-all duration-300 col-span-1 group font-xpoppins py-10 pl-5 bg-gradient-to-br from-[#aec8cf] text-slate-900 rounded-3xl flex items-end relative sm:h-[320px] h-[250px] overflow-hidden'>
              <div>
                <div className='mb-4'>
                  <p className='text-2xl font-semibold font-xpoppins'>Casual</p>
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Men</p>  
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Collection</p>
                  <div className='hidden lg:block w-[500px] h-[500px] absolute scale-0 -translate-x-36 -translate-y-80  transition-all duration-500  rounded-full bg-[#eee9e965] group-hover:scale-100'></div>
                </div>
                <img src={summerCategory} alt="" className='w-[250px] absolute bottom-0 -right-16' />
                <button className='lg:translate-y-24 lg:group-hover:translate-y-0 bg-slate-900 px-4 py-2 rounded-sm text-white font-xpoppins transition-all duration-500 z-20 cursor-pointer'>Shop Now <FaArrowRight className='inline-flex bg-white text-slate-900 rounded-full p-1 w-5 h-5' /></button>

              </div>
              
            </div> */}

            {/* sixth col */}
            {/* <div className='hover:scale-105 transition-all duration-300 col-span-1 group font-xpoppins py-10 pl-5 bg-gradient-to-br from-[#aec8cf] text-slate-900 rounded-3xl flex items-end relative sm:h-[320px] h-[250px] overflow-hidden'>
              <div>
                <div className='mb-4'>
                  <p className='text-2xl font-semibold font-xpoppins'>Summer</p>
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Men</p>  
                  <p className='text-4xl xl:text-5xl font-bold opacity-20 mb-2'>Collection</p>
                  <div className='hidden lg:block w-[500px] h-[500px] absolute scale-0 -translate-x-36 -translate-y-80  transition-all duration-500  rounded-full bg-[#eee9e965] group-hover:scale-100'></div>
                </div>
                <img src={summerCategory} alt="" className='w-[250px] absolute bottom-0 -right-16' />
                <button className='lg:translate-y-24 lg:group-hover:translate-y-0 bg-slate-900 px-4 py-2 rounded-sm text-white font-xpoppins transition-all duration-500 z-20 cursor-pointer'>Shop Now <FaArrowRight className='inline-flex bg-white text-slate-900 rounded-full p-1 w-5 h-5' /></button>

              </div>
              
            </div> */}


          </div>

          
        </div>

      </div>
    </div>
  )
}

export default Category
