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
import PaymentMethod from './components/PaymentMethod'
import PasswordManager from './components/PasswordManager'
import AddAddress from './pages/AddAddress'
import OrderDetails from './pages/OrderDetails'
import { BsShopWindow } from 'react-icons/bs'
import useAuth from './hooks/useAuth'

const ROLES={
  'USER':2001,
  'ADMIN':5000
}

const LayoutComponent=()=>{
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const ReqAuthComponent=()=>{
  //check auth
  const axiosPrivate=useAxiosPrivate();
  const {auth}=useAuth();
  const location=useLocation();
  return(
    auth?.userName?
    <div>
      <Navbar />
      <Outlet />
      <Footer />
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
      element:<OrderDetails />
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
        path: 'payment-method/:id',
        element:<PaymentMethod />
        },
        {
        path: 'add-address/:id',
        element:<AddAddress />
        },
      
      ]
    }]
  }
])







function App() {
  

  return (
    <RouterProvider router={router} />
  )
}

export default App
