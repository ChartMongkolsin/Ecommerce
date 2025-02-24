import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div className='min-h-screen bg-yellow-100'>
      <Navbar/>
      <main className="relative flex bg-gray-100 border pt-14">
        <Outlet/>
      </main>
      <div className='flex flex-1 bg-amber-300 h-screen'>

      </div>
      <div className='flex bg-amber-600 pt-14 flex-1'>

      </div>
    </div>
  )
}

export default App