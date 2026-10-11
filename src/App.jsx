import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/register'
import FrontPage from './pages/FrontPage'
import Profile from './pages/Profile'
import Groups from './pages/groups'
import MoviePage from './pages/MoviePage'
import Login from './pages/login.jsx'

import GroupPage from './pages/GroupPage'
import PublicProfile from './pages/PublicProfile'


import Navbar from './components/navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function App() {
  const { pathname } = useLocation()
  //  Sivut missä navbar piilossa
  const navbarHiddenPaths = ['/login', '/users', '/register','/' ]
  const showNavbar = !navbarHiddenPaths.includes(pathname) && !pathname.startsWith('/users/')
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}/>  
        <Route path="/FrontPage" element={<ProtectedRoute><FrontPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
        <Route path="/groups/:groupId" element={<ProtectedRoute><GroupPage /></ProtectedRoute>} />
        <Route path="/users/:id" element={<PublicProfile />} />
      </Routes>
    </>
  )
}

export default App
