//Formulario.js
import React, { Component } from 'react'

import {CategoriasConsumer} from "../context/CategoriasContext"
import {EventosConsumer} from "../context/EventosContext"

class Formulario extends Component {

  state = {  
    nombre:     "",
    categoria:  ""
  }

  //se ejecuta en nombre.onChange y categoria.onChange
  get_datos_evento = ojsevent => {
    //console.log("get_datos_evento.ojsevent.target",ojsevent.target)
    console.log("get_datos_evento.ojsevent.target.name",ojsevent.target.name)
    console.log("get_datos_evento.ojsevent.target.value",ojsevent.target.value)
    this.setState({
      //se guardaría: nombre:valor, categoria:valor
      [ojsevent.target.name] : ojsevent.target.value
    })
  }

  render() { 
    return (  
      <EventosConsumer>
      {
        //eventoscontext.provider.value:{eventos:payloadeventos,get_eventos:this.get_async_events(busqueda)}
        //evsprops: eventoscontext.provider.props
        (evsprops)=>{
          console.log("formulario.eventosconsumer.evsprops",evsprops)
          return (
            <form
              onSubmit={(e)=>{
                e.preventDefault();
                evsprops.get_eventos(this.state)
              }}
            >
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
                    //se le pasa el evento js como argumento
                    onChange={this.get_datos_evento}
                  />
                </div>
      
                <div className="uk-margin" uk-margin="true">
                  <select 
                    name="categoria"
                    className="uk-select"
                    //se le pasa el evento js como argumento
                    onChange={this.get_datos_evento}
                  >
                    <CategoriasConsumer>
                      {
                        //catsprops: categoriascontext.provider.props
                        (catsprops)=>{
                          console.log("categoriasconsumer.catsprops",catsprops)
                          return (
                            catsprops.categorias.map(categoria =>(
                              <option key={categoria.id} value={categoria.id} data-uk-form-select>
                                {categoria.name_localized}
                              </option>
                            ))
                          )
                        }
                      }
                    </CategoriasConsumer>
                  </select>
                </div>

                <div>
                  <input type="submit" className="uk-button uk-button-danger" value="Busca Eventos" />
                </div>                
              
              </div>
            </form>            
          )
        }
      }
      </EventosConsumer>      
    )//return
  }//render

}//Formulario
 
export default Formulario