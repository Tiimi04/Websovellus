import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <nav>
        <button type="button" onClick={() => navigate('/login')}>
          Kirjaudu
        </button>
        <button type="button" onClick={() => navigate('/register')}>
          Rekisteröidy
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
