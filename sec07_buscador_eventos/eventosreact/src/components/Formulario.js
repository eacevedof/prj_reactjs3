//Formulario.js
import React, { Component } from 'react'

class Formulario extends Component {

  state = {  
    nombre:     "",
    categoria:  ""
  }

  render() { 
    return (  
      <form>
        <fieldset className="uk-fieldset uk-margin">
          <legend className="uk-legend uk-text-center">
            Busca tu evento por Nombre y Categoría
          </legend>
        </fieldset>

        <div className="uk-column-1-3@m uk-margin">
          <div className="uk-margin" uk-margin="true">
            <input 
              name="nombre"
              className="uk-input"
              placeholder="Nombre de Evento o Ciudad"
            />
          </div>
          <div className="uk-margin" uk-margin="true">
            <select 
              className="uk-select"
              name="categoria"
            ></select>
          </div>
        </div>

        <div>
          <input type="submit" className="uk-button uk-button-danger" value="Busca Eventos" />
        </div>
      </form>
    )//return
  }//render

}//Formulario
 
export default Formulario