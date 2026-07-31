import { useState, useEffect } from 'react'

function Page3() {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        <div className='min-h-screen flex justify-center items-center'>
          <div className='grid grid-cols-2 gap-30'>
            <div className='w-125 h-75 p-6 rounded-lg bg-[#280c47] text-[#06f36f]'>Battery Current</div>
            <div className='w-125 h-75 p-6 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>Inverter Temperature</div>
            <div className='w-125 h-75 p-6 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>Brake Pressure</div>
            <div className='w-125 h-75 p-6 rounded-lg bg-gradient-to-br from-[#280c47] via-[#06f36f] to-[#06f36f] text-[#280c47]'>Suspension Travel</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Page3;