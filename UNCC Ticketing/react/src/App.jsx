import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Ticket from '/components/Ticket.jsx'
import Navbar from '../components/homepage/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/homepage/Home'
import './index.css'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/*<Ticket/> */}
    <Navbar/>
    <Home /> 
    </>
  )
}

export default App
