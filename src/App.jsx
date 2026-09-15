import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'
import NowPlaying from './pages/NowPlaying'
import FrontPage from './pages/FrontPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/NowPlaying" element={<NowPlaying />} />
        <Route path="/FrontPage" element={<FrontPage />} />
      </Routes>
    </>
  )
}

export default App
