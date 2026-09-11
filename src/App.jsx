import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Etusivu</Link>
        {' | '}
        <Link to="/login">Kirjaudu</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
