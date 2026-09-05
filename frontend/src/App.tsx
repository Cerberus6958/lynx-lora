import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Page1 from './pages/Page1.tsx';
import Page2 from './pages/Page2.tsx';
import Page3 from './pages/Page3.tsx';
import Imu from './pages/Imu.tsx';
import UltrasonicDemo from './pages/UltrasonicDemo.tsx';
import MasterPage from './pages/MasterPage.tsx';

function App() {
  // const [count, setCount] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true);
  const navLinks = [
    {
      to: 'master',
      items: [
        { full: 'Master', short: 'M' },
      ]
    },
    {
      to: '/1',
      items: [
        { full: 'Wheel Speed', short: 'WS' },
        { full: 'Throttle Position', short: 'TP' },
        { full: 'RPM', short: 'RPM' },
        { full: 'Motor Temperature', short: 'MT' },
      ],
    },
    {
      to: '/2',
      items: [
        { full: 'Coolant Temperature Motor', short: 'CT' },
        { full: 'Battery Temperature', short: 'BT' },
        { full: 'Battery Voltage', short: 'BV' },
      ],
    },
    {
      to: '/3',
      items: [
        { full: 'Battery Current', short: 'BC' },
        { full: 'Inverter Temperature', short: 'IT' },
        { full: 'Brake Pressure', short: 'BP' },
        { full: 'Suspension Travel', short: 'ST' },
      ],
    },
    {
      to: 'imu',
      items: [
        { full: 'IMU', short: 'IMU' },
      ]
    },
    {
      to: 'demo',
      items: [
        { full: 'Ultrasonic Demo', short: 'Demo' },
      ]
    },
  ]

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>

        <BrowserRouter>
          <header className={`h-screen bg-[#280c47] fixed transition-all duration-300 ${isExpanded ? 'w-30' : 'w-10'}`}>
            <div className='flex flex-col gap-8 items-center'>
              <button className='' onClick={() => setIsExpanded(!isExpanded)}>
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              {navLinks.map(({ to, items }) => (
                <Link to={to} key={to}>
                  {items.map((item) => (
                    <div className='text-[#06f36f]' key={item.short}>{isExpanded ? item.full : item.short}</div>
                  ))}
                </Link>
              ))}
            </div>
          </header>
          <main className={`${isExpanded ? 'pl-30' : 'pl-10'}`}>
            <Routes>
              <Route path='/master' element={<MasterPage />}></Route>
              <Route path='/1' element={<Page1 />}></Route>
              <Route path='/2' element={<Page2 />}></Route>
              <Route path='/3' element={<Page3 />}></Route>
              <Route path='/imu' element={<Imu />}></Route>
              <Route path='/demo' element={<UltrasonicDemo />}></Route>
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
