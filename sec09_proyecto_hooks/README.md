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
- 
```js
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
