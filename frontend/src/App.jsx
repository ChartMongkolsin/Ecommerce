import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Category from './components/category/Category'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200'>
      <Navbar />
      <Outlet />
      <Footer/>
    </div>
  )
}

export default App