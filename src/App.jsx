import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/register'
import FrontPage from './pages/FrontPage'
import Profile from './pages/Profile'
import Groups from './pages/groups'
import MoviePage from './pages/MoviePage'



import Navbar from './components/navbar.jsx'

function App() {
  const { pathname } = useLocation()
  //  Sivut missä navbar piilossa
  const navbarHiddenPaths = ['/login', '/register','/' ]
  const showNavbar = !navbarHiddenPaths.includes(pathname)
  return (
    <>
      {!navbarHiddenPaths.includes(pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}/>  
        <Route path="/FrontPage" element={<FrontPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </>
  )
}

export default App
