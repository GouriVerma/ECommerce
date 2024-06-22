import { useState, useEffect } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider, Outlet, useLocation, Navigate} from 'react-router-dom'
import useAxiosPrivate from './hooks/useAxiosPrivate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Product from './pages/Product'
import Cart from './pages/Cart'
import Shop from './pages/Shop'
import MyAccount from './pages/MyAccount'
import PersonalInformation from './components/PersonalInformation'
import ManageAddress from './components/ManageAddress'
import MyOrders from './components/MyOrders'
import PasswordManager from './components/PasswordManager'
import AddAddress from './pages/AddAddress'
import OrderProductDetails from './pages/OrderProductDetails'
import useAuth from './hooks/useAuth'
import ShippingAddress from './pages/ShippingAddress'
import PaymentInfo from './pages/PaymentInfo'
import OrderPlacedSuccess from './pages/OrderPlacedSuccess'
import OrderPlacedFailure from './pages/OrderPlacedFailure'
import Logout from './pages/Logout'
import Loading from './components/Loading'
import ForgotPassword from './pages/ForgotPassword'

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}


const ROLES={
  'USER':2001,
  'ADMIN':5000
}

const LayoutComponent=()=>{
  return (
    <div className=''>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

const ReqAuthComponent=()=>{
  //check auth

  const {auth}=useAuth();
  const location=useLocation();
  return(
    auth?.userName?
    <div className=''>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
    :
    <Navigate to="/login" replace={true} state={{from:location}} />
    
  )
}

const AdminComponent=({allowedRoles})=>{
  allowedRoles?.includes(auth?.role)?
    <Outlet />
    : auth?.userName?
      <Navigate to="/unauthorized" replace={true} state={{from:location}} />
      : <Navigate to="/login" replace={true} state={{from:location}} />
}

const LoginSignUpComponent=()=>{
  return (
    <Outlet />
  )
}

const router=createBrowserRouter([
  {
    path: "/",
    element: <LayoutComponent />,
    children:[{
      path: "/",
      element: <Home />
    },
    {
      path:"/shop",
      element:<Shop />
    },
    {
      path:"/men",
      element: <Shop gender="men" />
    },
    {
      path: "/women",
      element: <Shop gender="women" />
    },
    {
      path: "/kids",
      element: <Shop gender="kids" />
    },
    
    {
      path:"/product/:id",
      element:<Product />
    },
    {
      path:"/forgot-password/:id",
      element:<ForgotPassword />
    }
  ]
  },
  {
    path: "/",
    element:<LoginSignUpComponent />,
    children:[
      {
        path:"/login",
        element: <Login />
      },
      {
        path:"/signup",
        element:<Signup />
      },

    ]
  },
  {
    path: "/",
    element:<ReqAuthComponent />,
    children:[{
      path:"/cart/:id",
      element:<Cart />
    },
    {
      path:"/order/:id",
      element:<OrderProductDetails />
    },
    {
      path: "/my-account",
      element:<MyAccount />,
      children:[
        {
        path: 'personal-information/:id',
        element:<PersonalInformation />
        },
        {
        path: 'my-orders/:id',
        element:<MyOrders />
        },
        {
        path: 'manage-address/:id',
        element:<ManageAddress />
        },
        {
        path: 'password-manager/:id',
        element:<PasswordManager />
        },
        {
        path: 'add-address/:id',
        element:<AddAddress />
        },
        {
        path: 'logout/:id',
        element:<Logout />
        },
      
      ]
    },
    {
      path:"/place-order/shipping-address/:id",
      element:<ShippingAddress />
    },
    {
      path:"/place-order/payment-options/:id",
      element:<PaymentInfo />
    },
    {
      path:"/order-success",
      element:<OrderPlacedSuccess />
    },
    {
      path:"/order-failure",
      element:<OrderPlacedFailure />
    },

  ],
    
  }
])







function App() {
  
  
  
  return (
    <RouterProvider router={router} />
  )
}

export default App
