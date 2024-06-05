import { useState } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/home'
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ShopCategory from './pages/ShopCategory'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Shop from './pages/Shop'

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

  //redirect to login if not logged in

  return(
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
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
      element: <ShopCategory category="men" />
    },
    {
      path: "/women",
      element: <ShopCategory category="women" />
    },
    {
      path: "/kids",
      element: <ShopCategory category="kid" />
    },
    {
      path:"/login",
      element: <Login />
    },
    {
      path:"/signup",
      element:<Signup />
    },
    {
      path:"/product/:id",
      element:<Product />
    }
  ]
  },
  {
    path: "/",
    element:<ReqAuthComponent />,
    children:[{
      path:"/cart/:id",
      element:<Cart />
    }]
  }
])







function App() {
  

  return (
    <RouterProvider router={router} />
  )
}

export default App
