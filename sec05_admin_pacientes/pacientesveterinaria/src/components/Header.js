//Header.js
import React from 'react'

//stateless functional component
const Header = ({titulo}) => (
  <header>
    <h1 className="text-center">{titulo}</h1>
  </header>
)
 
export default Header;