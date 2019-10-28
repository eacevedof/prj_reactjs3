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
-
```js
```
## 6. Pasando el Presupuesto al Componente Principal
-
```js
```
## 7. Mostrando los Componentes Condicionalmente
-
```js
```
## 8. Leyendo los Valores de los Gastos
-
```js
```
## 9. Creando un componente de errores
-
```js
```
## 10. Pasando el gasto al componente principal
-
```js
```
## 11. Creando los Componentes que mostrarán los gastos
-
```js
```
## 12. Mostrando los Gastos
-
```js
```
## 13. Mostrando el Presupuesto y restante
-
```js
```
## 14. Calculando el Restante
-
```js
```