import React from 'react';

const Evento = ({evento}) => {
  //extraer el texto
  let text = evento.descrption
  
  if(text){
    if(text.length > 250)
      text = text.substr(0,250)
  }
  else
    text = null

  return(
    <div>
      <div className="uk-card uk-card-default ">
        <div className="uk-card-media-top">
          {evento.logo 
            ? <img src={evento.logo.url} alt={evento.name} /> 
            : null}
        </div>
        <div className="uk-card-body">
            <h3 className="uk-card-title">{evento.name.text}</h3>
            {text}
        </div>
        <div className="uk-card-footer">
          <a href={evento.url} target="_blank" rel="noopener noreferrer" className="uk-button uk-button-secondary">Más información</a>
        </div>
      </div>
    </div>
  );
}

 
export default Evento;