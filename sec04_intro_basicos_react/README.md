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
- Te van a permitir separar el código
- Te permiten reutilizarlos
- Son como funciones js
- Puedes pasar datos de un comp a otro con **props**
- En react los datos fluyen de comp Padre a Hijo, no al reves.
- Dos tipos: **class component** y **functional component**
  - ![class vs function](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/02a51b9bbf012a1f2244e03d327c9b87/image.png)
- El único método obligatorio de class component es **render**
```js
//PrimerComponente.js
import React, {Component} from 'react';

class PrimerComponente extends Component {
    render() { 
        return ( <h1>Hola Mundo en PrimerComponente</h1> );
    }
}
//App.js
import PrimerComponente from "./components/PrimerComponente";
function App() {
  return (
    <Fragment>
      <PrimerComponente/>
      <PrimerComponente/>
      <PrimerComponente/>
    </Fragment>
  );//return
}//App()
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
