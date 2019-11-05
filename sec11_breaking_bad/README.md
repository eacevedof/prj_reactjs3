# 11. PROYECTO React Hooks - Frases de Breaking Bad

## 1. Lo que vamos a construir y aprender en este capítulo
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/859x604/19afad1c0f48a6722b5292cfa55d0af5/image.png)
## 2. Importando los archivos iniciales
```js
//app.js
```
## 3. Consultando la API con useEffect
- npm install -save axios
```js
//App.js
import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  
  //obtener la frase de la api
  const [frase,obtenerFrase] = useState({})

  const get_async_data = async ()=>{
    const url = "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
    const resultado = await axios(url)
    //console.log("resultado:",resultado.data[0])
    //agregar el resultado al state
    obtenerFrase(resultado.data[0])
  }

  //componentDidMount || componentDidUpdate

  //useEffect es un listener que ejecutará el callback con cada cambio que haya en al app
  //por este motivo con las llamadas a la api se quedaría en un bucle infinito pq a cada respuesta 
  //se vuelve a lanzar el callback. Por esto exite el segundo parámetro que es donde se le indica 
  //cuando tiene que cambiar, es decir, con los cambios que afecten a determinadas variables
  useEffect(
    () => {
      get_async_data()
    },[])

  console.log("frase",frase)
  return <p>{frase.quote}</p>
}

```
## 4. Mostrando los Resultados de la Consulta
```js
//App.js
function Frase({frase}){
  return (
    <div className="frase">
      <h1>{frase.quote}</h1>
      <p>-{frase.author}</p>
    </div>
  )
}
...
  return (
    <div className="contenedor">
      <Frase
        frase={frase}
      />
    </div>
  )
```
## 5. Agregar un botón para generar una nueva frase
```js
//App.js
  return (
    <div className="contenedor">
      <Frase
        frase={frase}
      />
      <button
        onClick={get_async_data}
      >Generar Nueva</button>
    </div>
  )
```
## Netlyfy
- [https://eaf-breakingbad.netlify.com/](https://eaf-breakingbad.netlify.com/)
