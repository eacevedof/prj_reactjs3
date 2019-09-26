//Header.js
import React from 'react'
import PropTypes from "prop-types"

//stateless functional component
const Header = ({titulo}) => (
  <header>
    <h1 className="text-center">{titulo}</h1>
  </header>
)

//documentación de tipos
Header.propTypes = {
  titulo: PropTypes.string.isRequired
}
 
export default Header;