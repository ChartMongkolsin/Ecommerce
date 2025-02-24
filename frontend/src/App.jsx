import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'

function App() {
  return (
    <div className=''>
      <Navbar/>
        <Outlet/>
      <main className="">
        <Hero/>
      </main>

      <div>

      </div>
    </div>
  )
}

export default App