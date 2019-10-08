//App.js
import React, {useState} from 'react';
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import Error from "./components/Error"

function App() {

  //state principal
  const [ciudad, guardarCiudad] = useState("")
  const [pais, guardarPais] = useState("")
  const [error, guardarError] = useState("")

  const datosConsulta = datos => {
    console.log(datos)
    // validar que ambos campos esten
    if(datos.ciudad === "" || datos.pais === ""){
      guardarError(true)
      return
    }

    // Ciudad  y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
    guardarError(false)
  }

  //cargar un componente condicionalmente
  let componente = null
  if(error){
    componente = <Error mensaje="Ambos campos son obligatorios" />
  }

  return (
    <div className="App">
      <Header 
        titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta}/>
            </div>

            <div className="col s12 m6">
              {componente}
            </div>

          </div>  
        </div>
      </div>
    </div>
  );
}

export default App;
