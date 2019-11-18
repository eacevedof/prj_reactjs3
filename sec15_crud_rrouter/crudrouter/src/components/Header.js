//Header.js
import React from 'react';
import {Link, NavLink} from "react-router-dom"

const Header = () => {
  return (  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/productos" className="navbar-brand">
          React CRUD & Routing
        </NavLink>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink 
              to="/productos" 
              className="nav-link"
              activeClassName="active"
              >
              Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/productos/nuevo" 
              className="nav-link">
              Nuevo Producto
            </NavLink>
          </li>          
        </ul>
      </div>
    </nav>    
  )
}
 
export default Header;