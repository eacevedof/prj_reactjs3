import React, {useState, useEffect, Fragment} from "react"
import Formulario from "./components/Formulario"

function App() {
  const [artista, agregarArtista] = useState("")
  const [letra, agregarLetra] = useState([])
  const [info, agregarInfo] = useState({})

  //metodo para consultar la api de letras de canciones
  const consultarApiLetra = () =>{
     console.log("consultarApiLetra")
  }

  return (
    <Fragment>
      <Formulario consultarApiLetra={consultarApiLetra} />
    </Fragment>
  )
}

export default App;
