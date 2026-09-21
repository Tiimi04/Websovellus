import React from "react";
import './navbar.css';

const Navbar = () => {
    return (      
      <div className="dropdown">
          <button className="dropbtn">
            <img src="../public/burger-menu/brgrmenu2.png"></img>
          </button> 
          <div className="dropdown-content">
            <a href="/FrontPage">Etusivu</a>
            <a href="/profile">Profiili</a>
            <a>Parhaat elokuvat</a>
            <a href="/groups">Ryhmät</a>
            <a>Suosituimmat elokuvat</a>
            <a href="/">Kirjaudu ulos</a>
          </div>
      </div>
    )
}

export default Navbar;