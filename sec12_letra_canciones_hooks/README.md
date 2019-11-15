# 12. PROYECTO React Hooks - Proyecto de Letras de Música e Información

## 1. Lo que vamos a construir y aprender en este capítulo
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/f6fb85df221d4cabbdf4b12814697b69/image.png)
## 2. Primeros pasos con el Proyecto
- [Gist material](https://gist.github.com/juanpablogdl/913aa9fb212bee2815291b5228cfbfef)
- Inicio del proyecto
## 3. Creando múltiples state y múltiples Componentes

## 4. Leyendo los valores del Formulario

## 5. Pasando la búsqueda al componente principal

## 6. Consultando la API de Letras
- npm install axios
- no va la api
- https://api.lyrics.ovh/v1/travis/side

## 7. Mostrando los Resultados de la Letra
```js
//Cancion.js
import React,{Fragment} from 'react'

function Cancion({letra}){

  //si no hay datos devuelvo un render vacio (null)
  if(letra.length === 0)
    return null

  return (
    <Fragment>
      <h2>Letra Cancion</h2>
      <p className="letra">{letra}</p>
    </Fragment>
  )
}

export default Cancion
```
## 8. useEffect para realizar la segunda consulta
- 
```js
```
## 9. Mostrando la información del Artista
- 
```js
```
