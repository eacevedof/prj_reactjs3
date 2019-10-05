//ListaEventos.js
import React from 'react';
import Evento from "./Evento"
import {EventosConsumer} from "../context/EventosContext"


const ListaEventos = () => {
  return (  
    <div className="uk-child-width-1-3@m" uk-grid="true">
      <EventosConsumer>
        {(evtprops)=>{
          console.log("listaeventos.evtprops",evtprops)
          return evtprops.eventos.map(evento => (
            <Evento/>
          ))
        }}
      </EventosConsumer>
    </div>
  )
}
 
export default ListaEventos; 
