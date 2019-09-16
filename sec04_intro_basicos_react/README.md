# 4. Introducción y Básicos de React

## 1. Estructura Básica de un Proyecto con create-react-app
- public
    - Archivos estáticos, imágenes
- src
    - componentes
- Limpieza de código y ficheros iniciales demo

## 2. React sin JSX
- Se puede crear codigo en React sin jsx, con js nativo
- No es recomendable
- El problema con `React.createElement` es que tendriamos que anidar contenido
```js
//App.js
function App() {
  return (
    React.createElement(
      "div",
      null,
      React.createElement(
        "input",
        {type: "text", value: "Nombre de Usuario"}
      )
    )
  );
}

export default App;
```
## 3. React con JSX
- 
```js
//App.js
import React, {Fragment} from 'react';

function App() {
  const empleado = {
    nombre: "Juan Pablo",
    trabajo: "Desarrollador Web"
  }
  //antes del return es un buen lugar para introducir codigo js
  //{} las llaves indican a react q es codigo javascript
  return (
    //fragment evita tener que usar de wrapper un div por ejemplo
    <Fragment>
      <h1>{empleado.nombre}</h1>
      <p>{empleado.trabajo}</p>
      { 2+2 }
    </Fragment>
  );//return
}//App()
```
## 4. Que son los Componentes en React
- 
```js
```
## 5. Creando un Componente Funcional
- 
```js
```
## 6. Creando más Componentes
- 
```js
```
## 7. Introducción al State de React
- 
```js
```
## 8. Iterando el State y llamando los Componentes
- 
```js
```
## 9. Mostrando el Contenido en el Componente
- 
```js
```
## 10. Métodos de Ciclo de Vida del Componente
- 
```js
```
