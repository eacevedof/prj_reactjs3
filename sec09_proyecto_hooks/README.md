# 9. PROYECTO React Hooks - Creando un Proyecto con Hooks

## 1. Creando la Aplicación
- `create-react-app citas`

## 2. Creando nuestro primer Componente y utilizando useState
```js
//App.js
import React, {useState} from 'react'

function App() {
  // useState retorna 2 funciones
  // el state actual = this.state
  // Función que actualiza el state this.setState()
  const [citas, guardarCitas] = useState([])

  console.log(citas)

  return (
    <h>hola</h>
  )
}

export default App;
```
## 3. Creando el Componente de Formulario
- [gist - formulario](https://gist.github.com/juanpablogdl/f32ec169edabcbb461a2f5b7f8fd32af)
```js
//App.js
function Formulario(){
  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form>
        <label>Nombre Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
        />

        <label>Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota" 
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora" 
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
        ></textarea>
        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
    </Fragment>    
  )
}//Formulario

function App() {
...
  <Fragment>
      <h1>Administrador de Pacientes</h1>  
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario />
          </div>
          <div className="one-half column">
          </div>          
        </div>
      </div>
    </Fragment>
```
## 4. Actualizando el State del Formulario
```js
//App.js
function Formulario(){

  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  })

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }
...
      name="mascota"
      className="u-full-width" 
      placeholder="Nombre Mascota" 
      onChange={actualizarState}
    />
```
## 5. Agregando la Información de la cita en el State
- Se aplica **onChange={actualizarState}** en el resto de inputs

## 6. Pasando el State al Componente Principal
```js
//App.js
import React, {useState, Fragment} from 'react'

function Formulario({crearCita}){
  ...
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  const enviarCita = e => {
    e.preventDefault()
    console.log("Formulario.enviarcita.cita",cita)
    // pasar la cita hacia el componente principal
    crearCita(cita)
    // reiniciar el state (reiniciar el form)
  }
  ...
      <form
        onSubmit={enviarCita}
      >
  
  function App() {
    const crearCita = cita => {
      // tomar una copia del state y agregar el nuevo cliente
      const nuevasCitas = [...citas, cita]
      console.log("crearcita.nuevascitas",nuevasCitas)
      guardarCitas(nuevasCitas)
    }   
    ...
      <div className="one-half column">
         <Formulario crearCita={crearCita} />
      </div>
  ...
```
## 7. Mostrando las Citas del State
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1043x397/232cb4a2ae61e5914d6c5fe2f453c700/image.png)
```js
//App.js
function Cita({cita}){
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
    </div>
  )
}
....
function App() {
    <div className="one-half column">
      <Formulario crearCita={crearCita} />
    </div>
    <div className="one-half column">
      {citas.map((cita,index)=>(
        <Cita
          key={index}
          index={index}
          cita={cita}
        />
      ))}
    </div>  
```
## 8. Reiniciar el Formulario después de Enviarlo
```js
//App.js
function Formulario({crearCita}){

  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""    
  }
  ...
  const [cita, actualizarCita] = useState(stateInicial)
  ...
  const enviarCita = e => {
    e.preventDefault()
    console.log("Formulario.enviarcita.cita",cita)
    // pasar la cita hacia el componente principal
    crearCita(cita)
    // reiniciar el state (reiniciar el form)
    actualizarCita(stateInicial)
  }  
```
## 9. Eliminando Citas
```js
//App.js
function Cita({cita, index, eliminarCita}){
  //app.eliminarcita
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
      <button type="button"
        onClick={()=>eliminarCita(index)}
        className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )
}

function App() {
  // elimina las citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas]
    nuevasCitas.splice(index,1)
    guardarCitas(nuevasCitas)
  }

    <div className="one-half column">
        {citas.map((cita,index)=>(
          <Cita
            key={index}
            index={index}
            cita={cita}
            eliminarCita={eliminarCita}
          />
        ))}  
```
## 10. Cambiando el Titulo si tenemos o no citas
- 
```js
```
## 11. Almacenando las Citas en LocalStorage
- 
```js
```
