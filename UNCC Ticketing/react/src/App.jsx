import { useState, useEffect, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Ticket from '/components/Ticket.jsx'
import Navbar from '../components/homepage/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../components/homepage/Home'
import Login from '../components/Login'
import UserPortal from '../components/UserPortal'
import AdminPortal from '../components/AdminPortal'
import { FAQ } from '../components/FAQ'
import { About } from '../components/About'

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated"))
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const logIn = () => setIsAuthenticated(true);
  const logOut = () => setIsAuthenticated(false);



  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminportal" element={isAuthenticated ? <AdminPortal /> : <Navigate to="/login" />} />
        <Route path="/userportal" element={isAuthenticated ? <UserPortal /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/faq" element={<FAQ/>}/>
        <Route path="/about" element={<About/>}/>

      </Routes>
    </AuthContext.Provider>
  )
}

export default App;
