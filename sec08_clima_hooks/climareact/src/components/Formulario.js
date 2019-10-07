//Formulario.js
import React, {useState} from "react"

function Formulario(){

  //state del componente
  // busqueda = state, guardarBusqueda = setState
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "", pais: ""
  }) 

  const handleChange = e => {
    //cambiar el state
    //this.setState({})
    guardarBusqueda({
      ...busqueda, //el estado anterior +
      [e.target.name] : e.target.value //el estado actual
    })

    console.log("Formulario.handleChange.busqueda",busqueda)
  }

  return (
    <form>
      <div className="input-field col s12">
        <input 
          name="ciudad"
          id="ciudad"
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="pais">
          <option value="">Selecciona un país</option>
          <option value="US">Estados unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
      </div>

      <div className="input-field col s12">
        <input 
          type="submit" 
          className="wafes-effect wafes-light btn-large btn-block yellow accent-4" 
          value="Buscar Clima" />
      </div>
    </form>
  )
}

export default Formulario;