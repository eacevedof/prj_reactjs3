//App.js
import React, {useState,useEffect} from 'react';
import Header from "./components/Header"
import Formulario from "./components/Formulario"
import Error from "./components/Error"

function App() {

  //state principal
  const [ciudad, guardarCiudad] = useState("")
  const [pais, guardarPais] = useState("")
  const [error, guardarError] = useState("")

  //es como componentdidmount y didupdate
  useEffect(()=>{
    console.log("useEffect","ciudad:",ciudad,"pais:",pais,"error:",error)
    if(ciudad == "") return

    const consultarApi = async () =>{
      //https://home.openweathermap.org/api_keys
      const appId = "d383efec5dcda63610630c6f875774d7";
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
  
      // consultar la URL
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
  
      console.log("consultarApi.resultado",resultado)
    }

    consultarApi()

  },
  //array observador de variables para que en caso de cambios
  //se ejecutara la función
  [ciudad,pais])

  const datosConsulta = datos => {
    console.log("datosConsulta.datos",datos)
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
