# 10. PROYECTO  Presupuesto Semanal elaborado con React Hooks

## 1. El Proyecto Final de este capítulo
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/958x515/eec944e656d185ddb0647162385d82d2/image.png)

## 2. Creando la App y Primeros Ajustes
- [getskeleton.com](http://getskeleton.com) framework css
  - Tiene **normalize.css y skeleton.css**
- [Gist helper.js e index.css](https://gist.github.com/juanpablogdl/7f2a486ee41f0c972ca990e4f654a08a)
## 3. Agregando el Primer Componente
```js
//Pregunta.js
function Pregunta(){
  return (
    <Fragment>
      <h2>Coloca tu Presupuesto</h2>
      <form>
        <input type="text"
          className="u-full-width"
          placeholder="Agrega tu Presupuesto"
          //onChange={}
        />
        <input type="submit" className="button-primary u-full-width" value="Definir Presupuesto"/>
      </form>
    </Fragment>
  )
}

//App.js
import Pregunta from "./components/Pregunta"

function App() {
  return (
    <div className="App">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          <Pregunta/>
        </div>
      </header>
    </div>
  );
}
```
## 4. Validando el Presupuesto
```js
//Pregunta.js
import React, {Fragment, useState} from 'react'
function Pregunta(){
 const [cantidad, guardarCantidad] = useState(0)
  const [error, guardarError] = useState(false)

  const agregarPresupuesto = e =>{
    e.preventDefault()
    if(cantidad<1 || isNaN(cantidad)){
      guardarError(true)
      return
    }
  }

  return (
    <Fragment>
      <h2>Coloca tu Presupuesto</h2>
      <form
        onSubmit={agregarPresupuesto}
      >
        <input type="number"
          className="u-full-width"
          placeholder="Agrega tu Presupuesto"
          onChange={e => guardarCantidad(parseInt(e.target.value,10))}
        />
        <input type="submit" className="button-primary u-full-width" value="Definir Presupuesto"/>
      </form>
    </Fragment>
  )
```
## 5. Mostrando un Mensaje de Error
```js
//Pregunta.js
  return (
    <Fragment>
      <h2>Coloca tu Presupuesto</h2>
      {error ? <p className="alert alert-danger error">El presupuesto es incorrecto</p>: null}
      <form
        onSubmit={agregarPresupuesto}
```
## 6. Pasando el Presupuesto al Componente Principal
```js
//Pregunta.js
//como se van a pasar varios argumentos mejor se usa props
//en lugar del deconstructoring
function Pregunta(props){
  const {guardarPresupuesto} = props

//App.js
function App() {
  //state
  const [presupuesto, guardarPresupuesto] = useState(0)

  return (
    <div className="App">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          <Pregunta 
            guardarPresupuesto={guardarPresupuesto}
          />
        </div>
```
## 7. Mostrando los Componentes Condicionalmente
```js
//Pregunta.js
const {guardarPresupuesto,guardarPreguntaPresup} = props
guardarPreguntaPresup(false)

//App.js
<div className="contenido-principal contenido">
{
preguntaPresup  ?
<Pregunta 
guardarPresupuesto={guardarPresupuesto}
guardarPreguntaPresup={guardarPreguntaPresup}
/>
: (
  <div className="row">
    <div className="one-half column">
      <p>Formulario aqui</p>
    </div>

    <div className="one-half column"></div>
  </div>
)
```
## 8. Leyendo los Valores de los Gastos
```js
//Formulario.js
import React,{useState} from 'react'

function Formulario(props){

  const [nombreGasto,guardarNombreGasto] = useState("")
  const [cantidadGasto,guardarCantidadGasto] = useState("0")
  const [error,guardarError] = useState(false)
  
  const agregarGasto = e =>{
    e.preventDefault()

    if(cantidadGasto<1 || isNaN(cantidadGasto) || nombreGasto===""){
      guardarError(true)
      return
    }    
    guardarError(false)
  }

  return (
    <form
      onSubmit={agregarGasto}
    >
      <h2>Agrega tus Gastos Aqui</h2>
      <div className="campo">
        <label>Nombre Gasto</label>
        <input 
          type="text"
          className="u-full-width"
          placeholder="Ej. Transporte"
          onChange={e => guardarNombreGasto(e.target.value)}
        />
      </div>
      <div className="campo">
        <label>Cantidad Gasto</label>
        <input 
          type="number"
          className="u-full-width"
          placeholder="Ej. 300"
          onChange={e => guardarCantidadGasto(parseInt(e.target.value,10))}
        />
      </div>
      <input type="submit" className="button-primary u-full-width" value="Agregar Gasto"/>    
    </form>
  )
}
//App.js
guardarPreguntaPresup={guardarPreguntaPresup}
/>
: (
  <div className="row">
    <div className="one-half column">
      <Formulario/>
    </div>
```
## 9. Creando un componente de errores
```js
//Error.js
import React from 'react';

const Error = ({mensaje}) => (
  <p className="alert alert-danger error">{mensaje}</p>
)
//Formulario.js
{error ? <Error mensaje="Ambos campos son obligatorios o Presup Incorrecto"/> : null}
//Pregunta.js
{error ? <Error mensaje="El presupuesto es incorrecto"/> : null}
```
## 10. Pasando el gasto al componente principal
- `npm install --save shortid`
```js
//Formulario.js
  const agregarGasto = e =>{
    e.preventDefault()

    if(cantidadGasto<1 || isNaN(cantidadGasto) || nombreGasto===""){
      guardarError(true)
      return
    }    
    guardarError(false)

    const gasto = {
      nombreGasto,
      cantidadGasto,
      id: shortid.generate()
    } 

    //app.props.guadargasto que guarda en app.gasto
    guadarGasto(gasto)

    //resetamos el form
    guardarNombreGasto("")
    guardarCantidadGasto("")
  }//agregarGasto

<label>Nombre Gasto</label>
<input 
  type="text"
  className="u-full-width"
  placeholder="Ej. Transporte"
  onChange={e => guardarNombreGasto(e.target.value)}
  value={nombreGasto}
/>
</div>
<div className="campo">
<label>Cantidad Gasto</label>
<input 
  type="number"
  className="u-full-width"
  placeholder="Ej. 300"
  onChange={e => guardarCantidadGasto(parseInt(e.target.value,10))}
  value={cantidadGasto}
/>  

//App.js
  const [gasto, guardarGasto] = useState({})
  const [gastos, guardarGastos] = useState([])

  <Formulario
    guardarGasto={guardarGasto}
  />  
```
## 11. Creando los Componentes que mostrarán los gastos
```js
//Gasto.js
const Gasto = () => (
  <li className="gastos">
    <p>
      {Gasto.nombreGasto}
      <span className="gasto">${Gasto.cantidadGasto}</span>
    </p>
  </li>
)
//Listado.js
import Gasto from "./Gasto"
function Listado({gastos}) {
  return (
    <div className="gastos-realizados">
      <h2>Listado</h2>
      {gastos.map(gasto => (
        <Gasto 
          key = {gasto.id}
          gasto={gasto}
        />
      ))}
    </div>
  )
}

//App.js
useEffect(()=>{
  const listadoGastos = [...gastos,gasto]
  guardarGastos(listadoGastos)
},[])//por esto se quedaba colgado, es necesario pasar un objeto inicial

<div className="one-half column">
  <Listado 
    gastos={gastos}
  />
</div>
```
## 12. Mostrando los Gastos
- Configurar carga por defecto con useEffect (componentDidMount)
```js
//App.js
  //componentDidMount
  useEffect(()=>{
    if(crearGasto){
      const listadoGastos = [...gastos,gasto]
      guardarGastos(listadoGastos)

      // una vez que se agrega, lo ponemos como false
      guardarCrearGasto(false)
    }
  },[crearGasto])//por esto se quedaba colgado, es necesario pasar un objeto inicial
  ...
  <Formulario
    guardarGasto={guardarGasto}
    guardarCrearGasto={guardarCrearGasto}
  />
//Formulario.js
    //app.props.guadargasto que guarda en app.gasto
    guardarGasto(gasto)
    guardarCrearGasto(true)

    //eliminar alerta
    guardarError(false)  
```
## 13. Mostrando el Presupuesto y restante
```js
//ControlPresupuesto.js
import React, {Fragment} from 'react';

const ControlPresupuesto = ({presupuesto, restante}) => (
  <Fragment>
    <div className="alert alert-primary">
      presupuesto: ${presupuesto}
    </div>
    <div className="">
      Restante : $ {restante}
    </div>
  </Fragment>
)
 
//pregunta.js
function Pregunta(props){
  const {guardarPresupuesto,guardarPreguntaPresup,guardarRestante} = props
  ...
  guardarRestante(cantidad)
```
## 14. Calculando el Restante
- https://gist.github.com/juanpablogdl/7f2a486ee41f0c972ca990e4f654a08a
- helpers.js
```js 
//App.js
//componentDidMount
useEffect(()=>{
  if(crearGasto){
    const listadoGastos = [...gastos,gasto]
    guardarGastos(listadoGastos)

    // restar el presupuesto
    const presupuestoRestante = restante - gasto.cantidadGasto
    guardarRestante(presupuestoRestante)

    // una vez que se agrega, lo ponemos como false
    guardarCrearGasto(false)
  }
},[crearGasto,gastos,gasto,restante])//por esto se quedaba colgado,
// es necesario pasar un objeto inicial
/*
Line 30:5:  React Hook useEffect has missing dependencies: 'gasto', 'gastos'
, and 'restante'. Either include them or remove the dependency array  
react-hooks/exhaustive-deps
*/

//helpers.js
export const revisarPresupuesto = (presupuesto,restante) => {
    let clase;
    // Comprobar el 25% 
    if( (presupuesto / 4) > restante) {
         clase = 'alert alert-danger';
    } else if( (presupuesto / 2) > restante) {
        clase = 'alert alert-warning'
    } else {
        clase = 'alert alert alert-success';
    }
    return clase;
} 
//ControlPresupuesto.js
<div className={revisarPresupuesto(presupuesto,restante)}>
  Restante : $ {restante}
</div>
```