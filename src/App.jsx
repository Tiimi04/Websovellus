import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'
import NowPlaying from './pages/NowPlaying'
import FrontPage from './pages/FrontPage'
import Profile from './pages/Profile'


import Navbar from './components/navbar.jsx'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/NowPlaying" element={<NowPlaying />} />
        <Route path="/FrontPage" element={<FrontPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
