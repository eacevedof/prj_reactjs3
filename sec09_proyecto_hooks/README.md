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
- 
```js
```
## 5. Agregando la Información de la cita en el State
- 
```js
```
## 6. Pasando el State al Componente Principal
- 
```js
```
## 7. Mostrando las Citas del State
- 
```js
```
## 8. Reiniciar el Formulario después de Enviarlo
- 
```js
```
## 9. Eliminando Citas
- 
```js
```
## 10. Cambiando el Titulo si tenemos o no citas
- 
```js
```
## 11. Almacenando las Citas en LocalStorage
- 
```js
```
