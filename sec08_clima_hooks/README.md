# 8. PROYECTO Aplicación del Clima con React Hooks

## 1. El Proyecto que construiremos
- Demo app clima
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1153x570/a5a02b979f75836a5556791f563e7d12/image.png)

## 2. Que son los React Hooks y Preguntas Frecuentes
- Disponibles desde la v16.8
- Podremos actualizar el State sin necesidad de crear un **Class Component**
- La cantidad de código es menor
- función **usestate**: `import React, {useState} from "react"`
- la función consta de dos partes:
  - `const [clientes, guardarCliente] = useState([])`
  - clientes = Tiene el state actual
  - guardarClientes = Cambia el state
- Preguntas frecuentes:
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1169x659/1a3aabd5eb177e58d88fae080cbdd8c9/image.png)
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1146x664/6fe631540ef0bc198d8a7dc5bc57a06b/image.png)
- Beneficios reales de los hooks:
  - Menor cantidad de código
  - Mayor facilidad para implementar reducers
  - Administrar el state y context
- Los Hooks se dividen en **2 grupos**:
  - **Básicos**: useState, useEffect
  - **Avanzados**: useContext, useRef, useReducer, useCallback, useMemo

## 3. Creando la App y Primeros Ajustes
- `create-react-app climareact`
- [gist - css y materialize](https://gist.github.com/juanpablogdl/9ad7b55fb821df1dd32209cacc9c90a7)
- [API - Openweathermap](https://openweathermap.org/)
  - [Acceso](https://trello.com/c/q12tzhCa/123-openweathermaporg)
- [Openweathermap - apikeys](https://home.openweathermap.org/api_keys)
## 4. Creando el Header
```js
//Header.js
import React  from 'react';

//todos los componentes de hooks son sfc
//pueden ser arrow functions o funcion declarada
function Header({titulo}){
  return (
    <nav>
      <div className="nav-wrapper light-blue darken-2">
        <a href="#!" className="brand-logo">{titulo}</a>
      </div>
    </nav>
  )
}//Header
```
## 5. Creando el Formulario
```js
//Formulario.js
import React from "react"

function Formulario(){

  const handleChange = e => {
    //cambiar el state
  }

  return (
    <form>
      <div className="input-field col s12">
        <input 
          name="ciudad"
          id="ciudad"
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="pais">
          ...
        </select>
      </div>

      <div className="input-field col s12">
        <input 
          type="submit" 
          className="wafes-effect wafes-light btn-large btn-block yellow accent-4" 
          value="Buscar Clima" />
      </div>
    </form>
  )
}

//App.js
import Header from "./components/Header"
import Formulario from "./components/Formulario"

function App() {
  return (
    <div className="App">
      <Header 
        titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario/>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}
```
## 6. Colocando los valores del formulario en el state
```js
//Formulario.js
import React, {useState} from "react"

function Formulario(){

  //state del componente
  // busqueda = state, guardarBusqueda = setState
  //variable de estado y su setter
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "", pais: ""
  }) 

  const handleChange = e => {
    //cambiar el state
    //this.setState({})
    guardarBusqueda({
      ...busqueda, //el estado anterior +
      [e.target.name] : e.target.value //el estado actual
    })

    console.log("Formulario.handleChange.busqueda",busqueda)
  }
```
## 7. Validando el Formulario
```js
//Formulario.js
  const consultarClima = e => {
    e.preventDefault();
    // pasar hacia el componente principal la busqueda del usuario
    datosConsulta(busqueda)
  }

  return (
    <form
      onSubmit={consultarClima}

//App.js
function App() {

  //state principal
  const [ciudad, guardarCiudad] = useState("")
  const [pais, guardarPais] = useState("")

  const datosConsulta = datos => {
    console.log(datos)
    // validar que ambos campos esten
    if(datos.ciudad === "" || datos.pais === ""){
      //un error
      return;
    }

    //
    guardarCiudad(datos.ciudad)
    guardarPais(datos.pais)
  }
  ...
    <div className="col s12 m6">
      <Formulario datosConsulta={datosConsulta}/>
    </div>  
  ...
```
## 8. Mostrar el Error de la validación
- Un caso de uso: un usuario autenticado ve un menu distinto al no autenticado
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/816x345/0d64c91608f1c5706f8cebcfa47866dd/image.png)
```js
//Error.js
import React from 'react';

function Error({mensaje}){
  return (
    <div className="card-panel red darken-4 error col s12">
      {mensaje}
    </div>
  )
}

export default Error;

//App.js
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
  ...
    <div className="row">
      
      <div className="col s12 m6">
        <Formulario datosConsulta={datosConsulta}/>
      </div>

      <div className="col s12 m6">
        {componente}
      </div>
  ... 
```
## 9. Creando la función para consultar la API
- Los cilcos de vida ahora en hooks son los **Effects**, **useEffect**
```js
//App.js
import React, {useState,useEffect} from 'react';

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
```
## 10. Mostrando el Resultado del Clima
- Se trata el 404
- [](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/910x496/e334bdfec1549e58838105af94fb5ace/image.png)
```js
//Clima.js
import React from 'react';

function Clima({resultado}){
  
  console.log("clima.resultado",resultado)
  const {name, main} = resultado

  if(!name) return null

  //restar grados kelvin
  const kelvin = 273.15
 
  return (
    <div className="card-panel white col s12">
      <div className="black-text">
        <h2>El clima de {name} es</h2>
        <p className="temperatura">
          {parseInt(main.temp_max - kelvin,10)} <span>&#x2103; </span>
        </p>
        <p>Temperatura máxima: {parseInt(main.temp_max - kelvin,10)} &#x2103;</p>
        <p>Temperatura mínima: {parseInt(main.temp_min - kelvin,10)} &#x2103;</p>
      </div>
    </div>
  )
}

//App.js
  //cargar un componente condicionalmente
  let componente = <Clima
                      resultado={resultado}
                    />
  if(error) componente = <Error mensaje="Ambos campos son obligatorios" />
  if(resultado.cod === "404")
    componente = <Error mensaje="La ciudad no existe" />
```
