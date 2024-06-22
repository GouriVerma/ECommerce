import React, {useEffect, useState} from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { MdClose, MdMenu } from "react-icons/md";
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import logoBlackWhite from '../images/logoBlackWhite.png'
import logoBlueGolden from '../images/logoBlueGolden.png'


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
  ]

  
  const [menuOpen,setMenuOpen]=useState(false);

  
  const toggleMenu=()=>{setMenuOpen(!menuOpen);
    
  }

  useEffect(()=>{
    setMenuOpen(false);
  },[path])



  return (
    <header className='bg-white fixed top-0 left-0 right-0 z-30 border-b-2'>
      <nav className='  flex justify-between items-center font-xpoppins max-w-screen-2xl mx-auto xl:px-28 px-4 py-3 '>

        {/* logo section */}
        <Link to="/" className='flex items-center '>
            <img src={logoBlueGolden} className='w-44 object-cover' alt="" />
            
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
            <Link to='/login'><button className='hidden sm:flex px-8 py-2 border border-gray-700 rounded-3xl font-medium cursor-pointer hover:bg-orange-600 hover:text-white hover:border-orange-600 '>Login</button></Link>
             
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

          {/* {auth.userName &&
            <div className='flex items-center justify-center'>
              <Link to={`my-account/personal-information/${auth._id}`}><img src={auth.profileUrl} alt="" className='rounded-full w-8 h-'/></Link>
            </div>
          } */}

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
      <div className={`py-4 md:hidden bg-slate-800 ${menuOpen?"":"hidden"}`}>
        <div className={`flex flex-col item-start gap-y-1 space-y-4  text-gray-400 px-4 rounded`}>
            {
                navlinksMobile.map(({path,linkName})=>(
                        <NavLink to={path}
                        className={`${({isActive,isPending})=>isActive?"text-orange-200":""} hover:bg-[#79797971]`}
                        >{linkName}</NavLink>
                    
                ))
            }
        </div>
      </div>
        


      
   
    </header>
  )
}

export default Navbar
