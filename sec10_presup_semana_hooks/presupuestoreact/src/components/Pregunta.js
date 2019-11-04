//Pregunta.js
import React, {Fragment, useState} from 'react'
import Error from "./Error"

//como se van a pasar varios argumentos mejor se usa props
//en lugar del deconstructoring
function Pregunta(props){
  const {guardarPresupuesto,guardarPreguntaPresup,guardarRestante} = props

  const [cantidad, guardarCantidad] = useState(0)
  const [error, guardarError] = useState(false)

  const agregarPresupuesto = e =>{
    e.preventDefault()
    if(cantidad<1 || isNaN(cantidad)){
      guardarError(true)
      return
    }
    guardarError(false)
    //app.presupuesto = cantidad
    guardarPresupuesto(cantidad)
    guardarRestante(cantidad)
    guardarPreguntaPresup(false)
  }

  return (
    <Fragment>
      <h2>Coloca tu Presupuesto</h2>
      {error ? <Error mensaje="El presupuesto es incorrecto"/> : null}
      <form
        onSubmit={agregarPresupuesto}
      >
        <input type="number"
          className="u-full-width"
          placeholder="Agrega tu Presupuesto"
          onChange={e => guardarCantidad(parseInt(e.target.value,10))}
        />
        <input type="submit" className="button-primary u-full-width" value="Definir Presupuesto"/>
      </form>
    </Fragment>
  )
}

export default Pregunta