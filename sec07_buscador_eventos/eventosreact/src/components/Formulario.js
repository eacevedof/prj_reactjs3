//Formulario.js
import React, { Component } from 'react'

import {CategoriasConsumer} from "../context/CategoriasContext"

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
            >
              <CategoriasConsumer>
                {
                  //escucha al provider en app.js
                  //value: es un objeto con el array de categorias
                  (objprov)=>{
                    console.log("consumer objprov",objprov)
                    return (
                      objprov.categorias.map(categoria =>(
                        <option key={categoria.id} objprov={categoria.id} data-uk-form-select>
                          {categoria.name_localized}
                        </option>
                      ))
                    )
                  }
                }
              </CategoriasConsumer>
            </select>
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