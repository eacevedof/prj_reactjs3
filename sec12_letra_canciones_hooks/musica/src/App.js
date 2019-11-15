import React, {useState, useEffect, Fragment} from "react"
import Formulario from "./components/Formulario"
import Cancion from "./components/Cancion"
import Informacion from "./components/Informacion"
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

    //dispara el useEffect
    agregarArtista(artista)

    agregarLetra(resultado.data.lyrics)

  }//consultarApiLetra

  // Método para consultar la API de Información
  const consultarAPIInfo = async () => {
    if(artista){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await axios(url);
      agregarInfo(resultado.data.artists[0]);
      console.log(info)
    }
  }  

  //componentDidUpdate
  useEffect(
    ()=>{
      consultarAPIInfo(artista)
      console.log("agregaste artista")
  },[artista])
  //configuracion de que escucha de variables, cuando cambien se ejecutará esta funcion

  return (
    <Fragment>
      <Formulario consultarApiLetra={consultarApiLetra} />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion 
              info={info}
            />
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
