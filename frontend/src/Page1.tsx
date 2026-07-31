import { useState, useEffect } from 'react'

function Page1() {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        <div className='min-h-screen flex justify-center items-center'>
          <div className='grid grid-cols-2 gap-30'>
            <div className='w-125 h-75 p-6 rounded-lg bg-[#280c47] text-[#06f36f]'>Wheel Speed</div>
            <div className='w-125 h-75 p-6 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>Throttle Position</div>
            <div className='w-125 h-75 p-6 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>RPM</div>
            <div className='w-125 h-75 p-6 rounded-lg bg-gradient-to-br from-[#280c47] via-[#06f36f] to-[#06f36f] text-[#280c47]'>Motor Temperature</div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Page1;