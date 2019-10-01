//Noticia.js
import React from 'react'

const Noticia = ({noticia}) => {

  console.log("obj noticia: ",noticia)
  //extraer los datos
  const { urlToImage, url,title,description,source} = noticia

  //condicionalmente cargar la imagen si esta disponible
  const imagen = (urlToImage)
        ?<div className="card-image">
          <img src={urlToImage} alt={title}/>
          <span className="card-title">{source.name}</span>
        </div>
        :null

  return(  
    <div className="col s12 m6 l4">
      <div className="card">
        {imagen}
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className="card-action">
          <a href={url} target="_blank" without rel="noopener noreferrer" className="waves-effect waves-light btn">
            Ver noticia completa
          </a>
        </div>
      </div>
    </div>
  )

}// fnNoticia

export default Noticia