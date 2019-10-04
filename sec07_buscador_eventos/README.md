# 7. PROYECTO Aplicación de Eventos con Context API y EventBrite API

## 1. El Proyecto que construiremos
- Demo del proyecto
- Buscador de eventos por contextos
- Un combo de selección de categorias y texto libre
  - ![imagen demo](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/2d84096892c95816790a92dc68bd2016/image.png)
## 2. Creando la App y Primeros Pasos
- `create-react-app eventosreact`
- Usaremos [**eventbrite API**](https://www.eventbrite.com/platform/api)
- usaremos [getuikit css](https://getuikit.com/docs/introduction)
- [gist index.css e index.html](https://gist.github.com/juanpablogdl/f547114d82c7009ca42cda8d65d61a00)
```js
-->
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
//instalación de fuentes y css de uikit
<link href="https://fonts.googleapis.com/css?family=Lato:400,900" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.6/css/uikit.min.css" />

<body>
....
//ficheros de js de uikit
<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.6/js/uikit.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.6/js/uikit-icons.min.js"></script>
</body>
```
## 3. Creando el Header
- Header y App
- Usamos fragment pq vamos a usar distintos componentes
- [eventbrite.com](https://www.eventbrite.com/platform/docs/introduction)
  - Api de eventos
```js
//Header.js
import React from 'react'
const Header = () => (  
  <header className="uk-margin" uk-margin="true">
    <h1 className="uk-text-center">Eventos en React con EventBrite API</h1>
  </header>
)

//App.js
import React, {Fragment} from 'react';
import Header from "./components/Header"
function App() {
  return (
    <Fragment>
      <Header/>
    </Fragment>
  )
}
```
## 4. Introducción a la API de EventBrite
- [eventbrite - Mis api-keys](https://www.eventbrite.com/account-settings/apps)
- [eventbrite - Lista de categorias](https://www.eventbrite.com/platform/api#/reference/categories)
- [eventbrite - crear api key](https://www.eventbrite.com/account-settings/apps/new)

## 5. Qué es Context API
- Disponible desde la v16.3
  - ![context-api](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/15db65b145b4153dfcb63c4305d8927a/image.png)
  - ![props obsoletos?](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/dc804672f48cee0a921dbcbdd8524ebd/image.png)
  - ![palabras clave](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/03bdbf16bac346d2a451778e8ee150e9/image.png)

## 6. Creando el Context
- Usaremos axios
- `npm install --save axios`
- [eventbrite categories](https://www.eventbrite.com/platform/api#/reference/categories/retrieve/category-by-id)
  - **get** `https://www.eventbriteapi.com/v3/categories/id/`
```js
//CategoriasContext.js
import React, { Component } from 'react'
import axios from "axios"

const oContext = React.createContext()
export const CategoriasConsumer = oContext.Consumer

class CategoriasProvider extends Component {

  token = "CFUVFRX4ZD43ZDFWVQKO"

  state = {  
    categorias : []
  }

  componentDidMount(){
    this.get_async_categories()
  }

  get_async_categories = async ()=>{
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`
    let categorias = await axios.get(url)
    console.log(categorias.data.categories)
    this.setState({
      categorias: categorias.data.categories
    })
  }

  render() { 
    return (  
      <oContext.Provider
        value={{
          categorias: this.state.categorias
        }}
      >
        {this.props.children}
      </oContext.Provider>
    )
  }

}//class CategoriasProvider

export default CategoriasProvider;

//App.js
import CategoriasProvider from "./context/CategoriasContext"

function App() {
  return (
    <CategoriasProvider>
```
## 7. Creando el Formulario
- **vscode** `imrc` `import React, { Component } from 'react';`
```js
//Formulario.js
class Formulario extends Component {
  state = {  
    nombre:     "",
    categoria:  ""
  }

  render() { 
    return (  
      <form>
        ...
          <div className="uk-margin" uk-margin="true">
            <input 
              name="nombre"
              className="uk-input"
              placeholder="Nombre de Evento o Ciudad"
            />
          </div>
          <div className="uk-margin" uk-margin="true">
            <select 
              className="uk-select"
              name="categoria"
        ...
      </form>
    )//return
  }//render
}//Formulario
```
## 8. Mostrando el resultado del Context en el Formulario
- Utilizando el consumer
```js
//Formulario.js
<select 
  className="uk-select"
  name="categoria"
>
  <CategoriasConsumer>
    {
      //escucha al provider en app.js
      //value: es un objeto con el array de categorias
      (objprov)=>{
        console.log("consumer objprov",objprov)
        return (
          objprov.categorias.map(categoria =>(
            <option key={categoria.id} objprov={categoria.id} data-uk-form-select>
              {categoria.name_localized}
            </option>
          ))
        )
      }
    }
  </CategoriasConsumer>
</select>
```
## 9. Leyendo los Datos del Formulario
- `[ojsevent.target.name] : ojsevent.target.value` ? pq el []
  - pregunta udemy
```js
//Formulario.js
//si el usuario agrega un evento o categoria
get_datos_evento = ojsevent => {
  console.log("get_datos_evento.ojsevent.target.name",ojsevent.target.name)
  console.log("get_datos_evento.ojsevent.target.value",ojsevent.target.value)
  this.setState({
    [ojsevent.target.name] : ojsevent.target.value
  })
}

<input 
  name="nombre"
  className="uk-input"
  placeholder="Nombre de Evento o Ciudad"
  //se le pasa el evento js como argumento
  onChange={this.get_datos_evento}
/>
</div>

<div className="uk-margin" uk-margin="true">
<select 
  className="uk-select"
  name="categoria"
  //se le pasa el evento js como argumento
  onChange={this.get_datos_evento}
>
```
## 10. Creando Context para los eventos
- 
```js
```
## 11. Como realizar la búsqueda de eventos con Context
- 
```js
```
## 12. Leyendo el Resultado de la búsqueda
- 
```js
```
## 13. Mostrando la Información de los Eventos
- 
```js
```
