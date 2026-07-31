import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import Page1 from './Page1.tsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-[#06f36f] via-[#280c47] to-[#280c47]'>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Page1 />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
