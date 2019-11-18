import React from 'react';
import {Link} from "react-router-dom"

const Header = () => {
  return (  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/productos" className="navbar-brand">
          React CRUD & Routing
        </Link>
      </div>
    </nav>    
  )
}
 
export default Header;