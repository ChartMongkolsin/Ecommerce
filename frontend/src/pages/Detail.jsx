import React from 'react'

function Detail() {
  return (
    <div className='w-screen h-screen'>
      <div className="flex w-full flex-col lg:flex-row container">
        <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
          content
          </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="card bg-base-300 rounded-box grid h-32 flex-grow place-items-center">
          content
          </div>
      </div>
    </div>
  )
}

export default Detail