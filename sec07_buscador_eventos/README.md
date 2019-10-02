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
- 
```js
```
## 5. Qué es Context API
- 
```js
```
## 6. Creando el Context
- 
```js
```
## 7. Creando el Formulario
- 
```js
```
## 8. Mostrando el resultado del Context en el Formulario
- 
```js
```
## 9. Leyendo los Datos del Formulario
- 
```js
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
