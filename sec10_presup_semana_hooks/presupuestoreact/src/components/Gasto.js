//Gasto.js
import React from 'react';

const Gasto = ({gasto}) => (
  <li className="gastos">
    <p>
      {gasto.nombreGasto}
      <span className="gasto">$ {gasto.cantidadGasto}</span>
    </p>
  </li>
)
export default Gasto

