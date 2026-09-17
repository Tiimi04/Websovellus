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
            <a href="/NowPlaying">Nyt Elokuvissa</a>
            <a>placeholder</a>
            <a>placeholder</a>
            <a>placeholder</a>
            <a>placeholder</a>
          </div>
        </div>
      </div>
    )
}

export default Navbar;