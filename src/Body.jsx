import React from 'react'
import {Outlet} from "react-router"
import Navbar from './Navbar'
const Body = () => {
  return (
    <>
    
    <div className=' flex flex-col h-screen '>
    <Navbar/>
    <div className='flex justify-center h-full items-start mt-20 '>
    <Outlet/>
    </div>
    </div>
    </>
  )
}

export default Body