//Formulario.js
import React,{useState} from 'react'
import Error from "./Error"
import shortid from "shortid"

function Formulario(props){

  const {guadarGasto} = props;

  const [nombreGasto,guardarNombreGasto] = useState("")
  const [cantidadGasto,guardarCantidadGasto] = useState("0")
  const [error,guardarError] = useState(false)
  
  const agregarGasto = e =>{
    e.preventDefault()

    if(cantidadGasto<1 || isNaN(cantidadGasto) || nombreGasto===""){
      guardarError(true)
      return
    }    
    guardarError(false)

    const gasto = {
      nombreGasto,
      cantidadGasto,
      id: shortid.generate()
    } 

    //app.props.guadargasto que guarda en app.gasto
    guadarGasto(gasto)

    //resetamos el form
    guardarNombreGasto("")
    guardarCantidadGasto("")
  }//agregarGasto

  return (
    <form
      onSubmit={agregarGasto}
    >
      <h2>Agrega tus Gastos Aqui</h2>
      {error ? <Error mensaje="Ambos campos son obligatorios o Presup Incorrecto"/> : null}
      <div className="campo">
        <label>Nombre Gasto</label>
        <input 
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          onChange={e => guardarNombreGasto(e.target.value)}
          value={nombreGasto}
        />
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input 
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          onChange={e => guardarCantidadGasto(parseInt(e.target.value,10))}
          value={cantidadGasto}
        />
      </div>
      <input type="submit" className="button-primary u-full-width" value="Agregar Gasto"/>    
    </form>
  )
}

export default Formulario
