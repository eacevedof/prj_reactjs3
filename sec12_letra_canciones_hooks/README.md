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
```js
//App.js
  //metodo para consultar la api de letras de canciones
  const consultarApiLetra = async busqueda =>{
    const {artista, cancion} = busqueda
     
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
    //en este caso usamos axios ya que useEffect se usa cuando se cambia algun componente
    //que va a desencadenar otro.  Por ejemplo cuando se va a cargar la página se necesita llamar una API
    
    console.log("url:",url)
    const resultado = await axios(url)

    //dispara el useEffect
    agregarArtista(artista)

    agregarLetra(resultado.data.lyrics)

  }//consultarApiLetra

  // Método para consultar la API de Información
  const consultarAPIInfo = async () => {
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const resultado = await axios(url);
      agregarInfo(resultado.data.artists[0]);
      console.log(info)
  }  

  //componentDidUpdate
  useEffect(
    ()=>{
      consultarAPIInfo(artista)
      console.log("agregaste artista")
  },[artista])
  //configuracion de que escucha de variables, cuando cambien se ejecutará esta funcion

```
## 9. Mostrando la información del Artista
- 
```js
```
