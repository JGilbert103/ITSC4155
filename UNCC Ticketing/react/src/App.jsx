import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Ticket from '/components/Ticket.jsx'
import Navbar from '../components/homepage/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/homepage/Home'
import Login from '../components/Login'
import UserPortal from '../components/UserPortal'
import './index.css'
import { FAQ } from '../components/FAQ'
import { About } from '../components/About'

//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userportal" element={<UserPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/about" element={<About/>}/>

      </Routes>
    </>
  )
}

export default App
