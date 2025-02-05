import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Ticket from '/components/Ticket.jsx'
import './index.css'
//import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Ticket/>
    </>
  )
}

export default App
