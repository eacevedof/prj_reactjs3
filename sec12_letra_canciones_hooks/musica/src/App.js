import React, {useState, useEffect, Fragment} from "react"
import Formulario from "./components/Formulario"
import Cancion from "./components/Cancion"
import axios from "axios"

function App() {
  const [artista, agregarArtista] = useState("")
  const [letra, agregarLetra] = useState([])
  const [info, agregarInfo] = useState({})

  //metodo para consultar la api de letras de canciones
  const consultarApiLetra = async busqueda =>{
    const {artista, cancion} = busqueda
     
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    //en este caso usamos axios ya que useEffect se usa cuando se cambia algun componente
    //que va a desencadenar otro.  Por ejemplo cuando se va a cargar la página se necesita llamar una API
    
    console.log("url:",url)
    const resultado = await axios(url)
    //console.log(resultado.data.lyrics)
    agregarLetra(resultado.data.lyrics)
  }

  return (
    <Fragment>
      <Formulario consultarApiLetra={consultarApiLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">

          </div>
          <div className="col-md-6">
            <Cancion 
              letra={letra} 
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;
