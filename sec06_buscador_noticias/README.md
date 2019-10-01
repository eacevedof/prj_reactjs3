# 6. PROYECTO Buscador de Noticias con Class Components

## 1. Viendo el Proyecto de este capítulo
- Se usará Class components y stateless funcional components
- que es como están el 95% de proyectos en react

## 2. Creando la App y primeros pasos
- llamadas a api externa con class components
- `create-react-app noticiasreact`
- `npm start` 
- [css materialize](https://gist.github.com/juanpablogdl/bb4846db5998f9e5cee2e1c80f25c30f)
```js
// public/index.html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
<link href="https://fonts.googleapis.com/css?family=Raleway:700,900" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  var elements = document.querySelectorAll('select');
  M.FormSelect.init(elements);
});
</script>
```
## 3. Consultando la API de noticias
- [newsapi.org/](https://newsapi.org/) 
  - Fuente de noticias
- [Más sobre mi apikey](https://trello.com/c/8oxzB53M/121-apikey)
- [docu newsapi](https://newsapi.org/docs/endpoints/top-headlines)
- Usaremos este endpoint: [https://newsapi.org/v2/top-headlines?country=us&apiKey=tuapikey](https://newsapi.org/v2/top-headlines?country=us&apiKey=xyz)
- **Interesante!!** usar funciones asincronas dentro de funciones normales sin usar promise.then() :)
```js
//App.js
//documento está listo, aqui se tiene que hacer la llamada
componentDidMount(){
  this.get_async_noticias()
}//componentDidMount

get_async_noticias = async () => {
  const apikey = "d83a1ac3fa404f67bae0d83a4334698x";
  const url = `https://newsapi.org/v2/top-headlines?source=techcrunch&country=us&apiKey=${apikey}`
  console.log("componentDidMount.url",url)
  const respuesta = await fetch(url)
  const noticias = await respuesta.json()
  console.log("componentDidMount.noticias.articles",noticias.articles)
  this.setState({
    noticias: noticias.articles
  })
}//get_async_noticias
```
## 4. Creando el Header
```js
//App.js
render() { 
    return ( 
      <Fragment>
        <Header 
          titulo = "Noticias React API"
        />
        <div className="container white contenedor-noticias"></div>
      </Fragment>
    )
  }//render
```
## 5. Iterando las Noticias y llamando los Componentes
- **error:** `TypeError: Cannot read property 'map' of undefined`
  - **solución:** Faltaba inicializar `notices = []` en el estado
```js
//ListaNoticias.js
import React from 'react';
import Noticia from "./Noticia"

const ListaNoticias = ({noticias}) => (
  <div className="row">
    {noticias.map(noticia => (
      <Noticia 
        key = {noticia.url}
        noticia = {noticia}
      />
    ))}
  </div>
)

//json noticia
/*
author: "Paulina Dedaj"
content: "A Florida teen found dead last week in a burglarized Port Charlotte home is being hailed a 
hero after his family said he died while protecting his 5-year-old sister.
↵The body of Khyler Edman, 15, was discovered by the Charlotte County Sheriff’s Office after … 
[+1840 chars]"
description: "A Florida teen found dead last week in a burglarized Port Charlotte home is being hailed 
a hero after his family said Monday he died while protecting his 5-year-old sister."
publishedAt: "2019-10-01T18:25:16Z"
source:
id: "fox-news"
name: "Fox News"
__proto__: Object
title: "Florida boy, 15, died while 'protecting' sister, 5, from home invasion, suspect arrested with 
several stabs... - Fox News"
url: "https://www.foxnews.com/us/florida-teen-15-died-while-protecting-sister-5-from-home-invasion-suspect-arrested-with-several-stabs-wounds"
urlToImage: "https://static.foxnews.com/foxnews.com/content/uploads/2019/10/Khyler-Edman-split.jpg"
*/
```
## 6. Mostrando la información de las Noticias
```js
const Noticia = ({noticia}) => {

  console.log("obj noticia: ",noticia)
  //extraer los datos
  const { urlToImage, url,title,description,source} = noticia
  return(  
    <div className="col s12 m6 l4">
      <div className="card">
        <div className="card-image">
          <img src={urlToImage} alt={title}/>
        </div>

        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <div className="card-action">
          <a href={url} target="_blank" without rel="noopener noreferrer" className="waves-effect waves-light btn">
            Ver noticia completa
          </a>
        </div>
      </div>
    </div>
  )
```
## 7. Cargando las imágenes condicionalmente
- 
```js
```
## 8. Creando un Buscador de Categorias
- 
```js
```
## 9. Consultando las Noticias en base a la selección
- 
```js
```
## 10. Documentando la App
- 
```js
```
## 11. Deployment del Proyecto
- 
```js
```