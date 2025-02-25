import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Category from './components/category/Category'

function App() {
  return (
    <div className=''>
      <Navbar />
      <main>
        <Hero />
      </main>
      <div>
        <Category />
      </div>
      <Outlet />
    </div>
  )
}

export default App