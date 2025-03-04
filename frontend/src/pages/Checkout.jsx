import React from 'react'
import addPicture from "../assets/product/add.png"

function Checkout() {
  return (
    <div className=' place-items-center grid w-full h-screen'>
      <div className='bg-white w-[300px] rounded-lg p-4 '>
      <form className="flex flex-col gap-4">
        <img src={addPicture} 
        className='max-h-[300px] w-auto object-contain rounded-md '
        alt=''/>
        <input type="file" className="file-input file-input-bordered file-input-error w-full max-w-xs" />
        
      </form>
      </div>
    </div>
  )
}

export default Checkout