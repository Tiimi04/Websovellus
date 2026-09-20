import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'
import NowPlaying from './pages/NowPlaying'
import FrontPage from './pages/FrontPage'
import Profile from './pages/Profile'


import Navbar from './components/navbar.jsx'

function App() {
  const { pathname } = useLocation()
  //  Sivut missä navbar piilossa
  const navbarHiddenPaths = ['/login', '/register'/*, '/' */]
  const showNavbar = !navbarHiddenPaths.includes(pathname)
  return (
    <>
      {!navbarHiddenPaths.includes(pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}/>  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/FrontPage" element={<FrontPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
