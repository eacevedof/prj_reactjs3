//Clima.js
import React from 'react';

function Clima({resultado}){
  
  console.log("clima.resultado",resultado)
  const {name, main} = resultado

  if(!name) return null

  //restar grados kelvin
  const kelvin = 273.15
 
  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>El clima de {name} es</h2>
        <p className="temperatura">
          {parseInt(main.temp_max - kelvin,10)} <span>&#x2103; </span>
        </p>
        <p>Temperatura máxima: {parseInt(main.temp_max - kelvin,10)} &#x2103;</p>
        <p>Temperatura mínima: {parseInt(main.temp_min - kelvin,10)} &#x2103;</p>
      </div>
    </div>
  )
}

export default Clima;