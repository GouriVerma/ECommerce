import React, {useEffect, useState} from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { MdClose, MdMenu } from "react-icons/md";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';


const USER_URL="/user"

const Navbar = () => {
  const {auth}=useAuth();
  const path=useLocation().pathname;

  const navlinks=[
      {path:"/",linkName:"Home"},
      {path:"/shop",linkName:"Shop"},
      {path:"/men",linkName:"Men"},
      {path:"/women",linkName:"Women"},
      {path:"/kids",linkName:"Kids"},
  ]
  const navlinksMobile=[
      {path:"/",linkName:"Home"},
      {path:"/shop",linkName:"Shop"},
      {path:"/men",linkName:"Men"},
      {path:"/women",linkName:"Women"},
      {path:"/kids",linkName:"Kids"},
      {path:"/my-account/personal-information/09237489234",linkName:"My Account"},
  ]

  
  const [menuOpen,setMenuOpen]=useState(false);

  
  const toggleMenu=()=>{setMenuOpen(!menuOpen);
    console.log(menuOpen);
  }

  useEffect(()=>{
    setMenuOpen(false);
  },[path])



  return (
    <header className='bg-white fixed top-0 left-0 right-0 z-30  border-b-2 '>
      <nav className='  flex justify-between items-center font-xpoppins max-w-screen-2xl mx-auto xl:px-28 px-4 '>

        {/* logo section */}
        <Link to="/" className='flex items-center'>
            <img src="https://i.pinimg.com/736x/cc/fa/03/ccfa03467c3e407343259d3d07b90b30.jpg" className='w-16 h-16 object-cover rounded-full' alt="" />
            <p className='text-gray-800 text-2xl font-semibold font-serif'>SHOPIFY</p>
        </Link>

        {/* links section */}
        <ul className='md:flex items-center gap-12 text-gray-400 font-medium hidden'>
            {
                navlinks.map(({path,linkName})=>(<li key={path} className='hover:text-black transition-all duration-300'>
                        <NavLink to={path}
                        className={({isActive,isPending})=>isActive?"text-black":""}
                        >{linkName}</NavLink>
                    </li>
                ))
            }
        </ul>


        
          
        {/* Cart and Login Section */}
        <div className='flex items-center gap-3 sm:gap-6'>  
          {!auth?.userName &&
            <Link to='/login'><button className='w-32 h-10 border border-gray-700 rounded-3xl font-medium cursor-pointer hover:bg-orange-600 hover:text-white hover:border-orange-600 '>Login</button></Link>
             
          } 
          {auth.userName && 
          <div className='flex items-center gap-3 sm:gap-6'>
            <Link to={`/my-account/personal-information/${auth?._id}`}><FaUser className='w-6 h-6 text-gray-500' /></Link>
            <div className='relative flex items-center'>
              <Link to={`/cart/${auth?._id}`}><FaCartShopping className='w-6 h-6 text-gray-500' /> </Link>
              {/* cart items count */}
              <div className='w-5 h-5 flex items-center justify-center mt-[-35px] ml-[-10px] rounded-full bg-orange-600 text-white text-xs'>{auth?.cartItemsCount}</div>
            </div>
          </div>
          }  

          {/* Close Open Button */}
          <div className='md:hidden'>

            <button onClick={toggleMenu}>
            {!menuOpen?(
              <MdMenu className={`cursor-pointer mr-2 p-1 h-8 w-8 ring-1 rounded-full ring-gray-800 `}  />
            ):
            (
              <MdClose className={`cursor-pointer mr-2 p-1 h-8 w-8 ring-1 rounded-full ring-gray-800`}  />
            )
            }
            </button>
          </div>
          
        </div>

        


        
        

        

        
      </nav>  

      {/* links section for mobile */}
      <div className={`md:hidden bg-slate-800 ${menuOpen?"":"hidden"}`}>
        <ul className={`flex flex-col item-start gap-y-1  text-gray-400 px-4 rounded`}>
            {
                navlinksMobile.map(({path,linkName})=>(<li key={path} className='py-3'>
                        <NavLink to={path}
                        className={({isActive,isPending})=>isActive?"text-white":""}
                        >{linkName}</NavLink>
                    </li>
                ))
            }
        </ul>
      </div>
        


      
   
    </header>
  )
}

export default Navbar
