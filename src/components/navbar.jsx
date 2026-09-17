import React from "react";
import './navbar.css';

const Navbar = () => {
    return (      
      <div className="navbar">
        <a href="/FrontPage">Elokuvasivun nimi</a>
        <div className="dropdown">
          <button className="dropbtn">
          Menu
          <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <a href="/FrontPage">Etusivu</a>
            <a>Nyt Elokuvissa</a>
            <a href="/profile">Profiili</a>
            <a>Parhaat elokuvat</a>
            <a>Selaa genreittäin</a>
            <a>Suosituimmat elokuvat</a>
            <a href="/">Kirjaudu ulos</a>
          </div>
        </div>
      </div>
    )
}

export default Navbar;