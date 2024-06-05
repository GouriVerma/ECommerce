import React, {useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { MdClose, MdMenu } from "react-icons/md";

const Navbar = () => {
  const [menuOpen,setMenuOpen]=useState(false);

  const navlinks=[
      {path:"/",linkName:"Home"},
      {path:"/shop",linkName:"Shop"},
      {path:"/men",linkName:"Men"},
      {path:"/women",linkName:"Women"},
      {path:"/kids",linkName:"Kids"},
  ]

  const toggleMenu=()=>{setMenuOpen(!menuOpen);
    console.log(menuOpen);
  }

  return (
    <header className=' bg-white fixed top-0 left-0 right-0 z-50 border-b-2 '>
      <nav className='flex justify-between items-center font-xpoppins max-w-screen-2xl mx-auto xl:px-28 px-4'>

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

        

        {/* Cart and Login Section */}
        <div className='lg:flex items-center gap-6 hidden'>
            <Link to='/login'><button className='w-32 h-10 border border-gray-700 rounded-3xl font-medium cursor-pointer hover:bg-orange-600 hover:text-white hover:border-orange-600 '>Login</button></Link>
            <FaUser className='w-6 h-6 text-gray-500' />
            <FaCartShopping className='w-6 h-6 text-gray-500' /> 
            <div className='w-5 h-5 flex items-center justify-center mt-[-35px] ml-[-35px] rounded-full bg-orange-600 text-white text-xs'>0</div>
        </div>

      </nav>  

      {/* links section for mobile */}
      <ul className={`md:hidden ${menuOpen? "flex flex-col item-start gap-y-1 bg-slate-800 text-gray-400 px-4 rounded":"hidden"}`}>
          {
              navlinks.map(({path,linkName})=>(<li key={path} className='py-3'>
                      <NavLink to={path}
                      className={({isActive,isPending})=>isActive?"text-white":""}
                      >{linkName}</NavLink>
                  </li>
              ))
          }
      </ul>
      
        


      
   
    </header>
  )
}

export default Navbar
