//Gasto.js
import React from 'react';

const Gasto = () => (
  <li className="gastos">
    <p>
      {Gasto.nombreGasto}
      <span className="gasto">${Gasto.cantidadGasto}</span>
    </p>
  </li>
)
export default Gasto

