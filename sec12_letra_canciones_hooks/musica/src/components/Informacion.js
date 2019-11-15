import React from "react"

function Informacion({info}){

  console.log("Informacion.info",info)
  if(Object.keys(info).length===0) return null

  return (
    <div className="card border-light">
      <div className="card-header bg-primary text-light font-weight-bold">
        Informacion Artista
      </div>
      <div className="card-body">
        <img src={info.strArtistThumb} alt="Logo Artista"/>
        <p className="card-text">Género: {info.strGenre}</p>
        <h2 className="card-text text-center">Biografia</h2>
        <p className="card-text">{info.strBiographyES}</p>
        <p className="card-text">
          <a href={`https://${info.strFacebook}`} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href={`https://${info.strTwitter}`} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href={`https://${info.strLastFMChart}`} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-lastfm"></i>
          </a>                    
        </p>

      </div>
    </div>
  )
}

export default Informacion