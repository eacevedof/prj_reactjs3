//Cancion.js
import React,{Fragment} from 'react'

function Cancion({letra}){

  //si no hay datos devuelvo un render vacio (null)
  if(letra.length === 0)
    return null

  return (
    <Fragment>
      <h2>Letra Cancion</h2>
      <p className="letra">{letra}</p>
    </Fragment>
  )
}

export default Cancion