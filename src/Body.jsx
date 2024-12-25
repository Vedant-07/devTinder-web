import React from 'react'
import {Outlet} from "react-router"
import Navbar from './Navbar'
const Body = () => {
  return (
    <>
    <Navbar/>
    <div>Body</div>
    <Outlet/>
    </>
  )
}

export default Body