import { useState, useEffect } from 'react'
import ChartTemplate from './ChartTemplate';

function Page3() {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>
        <div className='min-h-screen flex justify-center items-center'>
          <div className='grid grid-cols-2 gap-30'>
            <div className='w-125 h-75 p-2 rounded-lg bg-[#280c47] text-[#06f36f]'>
              <ChartTemplate name='Battery Current' colour='#06f36f'></ChartTemplate>
            </div>
            <div className='w-125 h-75 p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>
              <ChartTemplate name='Inverter Temperature' colour='#06f36f'></ChartTemplate>
            </div>
            <div className='w-125 h-75 p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#280c47] to-[#06f36f] text-[#06f36f]'>
               <ChartTemplate name='Brake Pressure' colour='#06f36f'></ChartTemplate>
            </div>
            <div className='w-125 h-75 p-2 rounded-lg bg-gradient-to-br from-[#280c47] via-[#06f36f] to-[#06f36f] text-[#280c47]'>
               <ChartTemplate name='Suspension Travel' colour='#280c47'></ChartTemplate>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Page3;

// Next work on Graphs and Making each grid box unique and in its separate file to be displayed on one page with all 12 eventually
// Could potentially also merge all 3 pages together somehow?