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


  get_async_events = async (objbuscar)=>{
    console.log("get_async_events.objbuscar",objbuscar)
    let url = `https://www.eventbriteapi.com/v3/events/search/?token=${this.token}&locale=es_ES&categories=${objbuscar.categoria}&q=${objbuscar.nombre}&sort_by=${this.ordenar}`
    let payload = await axios.get(url)
    //console.log("get_async_events.payload",payload)
    console.log("get_async_events.payload.data.events",payload.data.events)
    this.setState({
      eventos: payload.data.events
    })
  }

  render() { 
    return (  
      //eventos.provider
      <oContext.Provider
        value={{
          eventos: this.state.eventos,
          get_eventos: this.get_async_events
        }}
      >
        {this.props.children}
      </oContext.Provider>
    )//return
  }//render

}//class EventosProvider

export default EventosProvider;