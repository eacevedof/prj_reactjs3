//EventosContext.js
import React, { Component } from 'react'
import axios from "axios"

const oContext = React.createContext()
export const EventosConsumer = oContext.Consumer

class EventosProvider extends Component {

  token = "CFUVFRX4ZD43ZDFWVQKO"
  ordenar = "date"

  state = {  
    eventos : []
  }

  componentDidMount(){
    this.get_async_categories()
  }

  get_async_events = async (busqueda)=>{
    let url = `https://www.eventbriteapi.com/v3/events/search/?token=${this.token}
    &locale=es_ES&categories=${busqueda.categoria}&q=${busqueda.nombre}&sort_by=${this.ordenar}
    `
    
    let eventos = await axios.get(url)
    console.log(eventos.data.categories)
    this.setState({
      eventos: eventos.data.categories
    })
  }

  render() { 
    return (  
      <oContext.Provider
        value={{
          eventos: this.state.eventos
        }}
      >
        {this.props.children}
      </oContext.Provider>
    )
  }

}//class EventosProvider

export default EventosProvider;