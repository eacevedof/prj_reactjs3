//Header.js
import React  from 'react';

//todos los componentes de hooks son sfc
//pueden ser arrow functions o funcion declarada
function Header({titulo}){
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="#!" className="brand-logo">{titulo}</a>
      </div>
    </nav>
  )
}//Header

export default Header;