import { useNavigate } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogout = (event) => {
        event.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (      
      <div className="dropdown">
          <button className="dropbtn">
            <img src="../burger-menu/brgrmenu2.png"></img>
          </button> 
          <div className="dropdown-content">
            <a href="/FrontPage">Etusivu</a>
            <a href="/profile">Profiili</a>
            <a href="/groups">Ryhmät</a>
            <a href="/" onClick={handleLogout}>Kirjaudu ulos</a>
          </div>
      </div>
    )
}

export default Navbar;