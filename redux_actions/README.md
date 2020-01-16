## [Youtube - react redux-actions parte 1: estructura de proyecto | Leo Medina](https://www.youtube.com/watch?v=l48-c1U24eI)
## [Repo original](https://github.com/programax/react-redux-actions)

- **La aplicación**
- ![](https://trello-attachments.s3.amazonaws.com/5e0fa0a19672dd8191827199/587x896/1b8879496834c700cbbf76cb08d85fda/image.png)

- [Instalación](https://youtu.be/l48-c1U24eI?t=433)
  - `npx create-react-app fontend`
- Eliminar la carpeta src
```
frontend/
  public/
    favicon.ico
    index.html
    logo192.png
    logo512.png
    manifest.js
    robots.txt
  src/
    components/
    redux/
      reducers/
      actions.js
      store.js
    index.js
```
```js
//root.js
import React, { Component } from 'react';

class Root extends Component {
  state = {}
  render(){
    return (
      <div>
        Root
      </div>
    )
  }
}

//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./components/root"

const nodes = (
  <Root/>
)
RreactDOM.render(nodes, document.getElementById("root"))
```
- Error: `./src/index.js Line 9:1:  'RreactDOM' is not defined  no-undef`
- [Empezando la integración con redux](https://youtu.be/l48-c1U24eI?t=679)
- [Instalando redux](https://youtu.be/l48-c1U24eI?t=719) `npm i react-redux redux redux-actions`
- [Middleware o Store Inhances](https://youtu.be/l48-c1U24eI?t=835)
  - Configurando el store
- [combineReducers](https://youtu.be/l48-c1U24eI?t=915)
- [creando reducer comments](https://youtu.be/l48-c1U24eI?t=1028)
- [explicación **handleActions**](https://youtu.be/l48-c1U24eI?t=1281)
```js
//rdcomments.js
import { handleActions } from "redux-actions"

//forma con handleActions:
export default handleActions ({
  action1: (state, objaction) => {
    return [1,2,3]
  },

  action2: (state, objaction)=>{
    return [4,5,6]
  }
},[])//handleActions


//la forma tradicional:
export default function fn_rdcomments(state = [], objaction){
  //el nuevo estado para comments
  //return state;
  switch(objaction.type){
    case "action1":
      return [1,3,3]
    case "action2":
      return [4,5,6]
    default:
      return state
  }

}//fn_rdcomments
```
- [ejemplo tradicional de definir acciones sin redux-actions](https://youtu.be/l48-c1U24eI?t=1563)
  - ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5e0fa0a19672dd8191827199/c347d00269fa58f8cba361133866088e/Captura_de_pantalla_2020-01-14_a_las_21.59.28.png)
```js
//actions.js
//se definen acciones que son "action creators"
//sin redux-actions:
export const ACTION_1 = "action1"
export const ACTION_2 = "action2"

function action1(){
  return {
    type:     ACTION_1, //endpoint
    payload:  ["p1","p2","p3"], //nuevo estado
  }
}//action1

function action2(){
  return {
    type:     ACTION_2, //endpoint
    payload:  ["p1","p2","p3"], //nuevo estado
  }
}//action2
```
- [otra forma de invocar una accion](https://youtu.be/l48-c1U24eI?t=1859)
```js
//actions.js
//con redux-actions:
import { createAction } from "redux-actions"

export const action1 = createAction("action1")
export const action2 = createAction("action2")

//si se desea aplicar una lógica extra cuando se invoque a action2(some, params) se podria hacer esto
export const action2 = createAction("action2", (some,params)=>{
  //tu logica con esos parametros, solo se devolverá el payload, no el action
  return [4,8,0]
})

//el resultado de:
action2(2,4,5) sería por ejemplo 
{
  type:"action2",
  payload [4,8,0]
}

//de esta forma con createAction se podria separar las funciones en handlers
//reducer rdcomments.js
import { handleActions } from "redux-actions"
import { action1, action2 } from  "../actions"

function fn_handle_action1(){
  return 1
}

export default handleActions ({
    //action1.toString() devolveria "action1"
    [action1]: fn_handle_action1,
  
    [action2]: (state, objaction)=>{
      return [4,5,6]
    }
  },[])//handleActions
```
#### Estructura final:
```js
//======================================
//reducer rdcomments.js
import { handleActions } from "redux-actions"

export default handleActions ({
  action1: (state, objaction) => {
    return [1,2,3]
  },

  action2: (state, objaction)=>{
    return [4,5,6]
  }
},[])//handleActions

//======================================
//actions.js
import { createAction } from "redux-actions"

export const action1 = createAction("action1")
export const action2 = createAction("action2")

//======================================
//store.js
//El store es una función que agrupa un conjunto de funciones setters (reducers)
import {createStore, combineReducers} from "redux";
//los reducers son funciones que setean el estado
import fn_rdposts from "./reducers/rdposts"
import fn_rdcomments from "./reducers/rdcomments"

const fnreducer = combineReducers({
  //cada llave debe ser un fnreducer
  fn_rdposts,    //handleActions
  fn_rdcomments, //handleActions
})

//middleware o store inhances
const fnstore = createStore(fnreducer)

export default fnstore;

//======================================
//root.js
import React, { Component } from 'react'
import { connect } from "react-redux"
import { action1 } from "../redux/actions"

class Root extends Component {
  state = {}

  componentDidMount(){
    this.props.action1(777)
  }

  render(){
    console.log("this.props",this.props)
    return (
      <div>
        Root
      </div>
    )
  }
}

//indica como transformar el estado actual del store
const mapStateToProps = (state) => {
  return state
}

//indica lo que se disparará en la vista, sirve para inyectar funciones que se ejcutarán 
//en la vistaa
const mapDispatchToProps = {
  action1
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

//======================================
//index.js
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import fnstore from "./redux/fnstore"
import Root from "./components/root"

const nodes = (
  //el store es el almacen del estado
  //el provider hace visible ese almacen a todo el "dom"
  <Provider store={fnstore}>
    <Root/>
  </Provider>
)
ReactDOM .render(nodes, document.getElementById("root"))
```
- ![](https://trello-attachments.s3.amazonaws.com/5e0fa0a19672dd8191827199/547x198/f52ebb67d18a4e4d33cde66ec3d61518/trazas.png)

### [Parte 2](https://youtu.be/o_IsXVq8QBo)
- Axios
- Rest API
- [Configuración de PostAdmin](https://youtu.be/o_IsXVq8QBo?t=256)
- [`ref={ref => this.textRef = ref}`](https://youtu.be/o_IsXVq8QBo?t=365) es una técnica que usa **React** para poder tener acceso al elemento nativo del DOM al momento de cargar el componente, justo antes de montarlo ejecuta esa lógica.  Esto nos sirve para poder utilizar `this.textRef` en el evento onSubmit
- ![](https://trello-attachments.s3.amazonaws.com/5e0fa0a19672dd8191827199/924x294/d044d5902d1575281f4c73241c04ce5c/image.png)
```js
//postAdmin.js
import React, {Component} from "react";

class PostAdmin extends Component {
  state = {}

  render(){
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          
        }}
      >
        <div className="card border-light mb-3">
          <div className="card-header">Crear Publicación</div>
          <div className="card-body">
            <textarea
              ref={ref => this.textRef = ref}
              className="form-control nooutline"
              placeholder="Que estas pensando"
            />
            <label
              className="btn btn-secondary m-0 ml-2 mr-2"
              htmlFor="photoFile"
            >
              Foto
            </label>
            <input
              ref={ref => this.imageRef = ref}
              type="file"
              className="form-control-file d-none"
              id="photoFile"
            />
            <button type="submit" className="btn btn-primary">Publicar</button>
          </div>
        </div>
      </form>
    )//return

  }//render

}//PostAdmin

export default PostAdmin

//index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  </body>
</html>

//root.js
class Root extends Component {
  state = {}

  componentDidMount(){
    this.props.action1(777)
  }

  render(){
    console.log("this.props",this.props)
    return (
      <div>
        <Layout>
          <PostAdmin />
        </Layout>
      </div>
    )//return
    
  }//Render

}//class Root

//layout.js
import React from "react"

const Layout = (props)=>{
  const { children } = props
  return (
    <>
      <nav className="navbar navbar-light bg-light"> 
        <span className="navbar-brand">CRUD</span>
      </nav>

      <div className="container">
        <div className="row p-3">
          <div className="offset-3 col-6">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
```
- [Ejemplo de map](https://youtu.be/o_IsXVq8QBo?t=794)
```js
{Boolean(comments.length) &&
    <div className="card-body p-2">
      {comments.map(comment => (
        <div
          key={comment.id}
          className="bg-light alert alert-secondary p-2 mb-1"
          role="alert"
        >
          <b>{comment.author}: </b>
          <span>{comment.content}</span>
        </div>
      ))}
    </div>
  }
```
- [Ya está todo el maquetado](https://youtu.be/o_IsXVq8QBo?t=865)
```js
//post.js
import React, { Component } from 'react';

class Post extends Component {
  state = {  }
  render() { 
    const {
      content,
      imageUrl,
      comments,
    } = this.props

    return ( 
      <div className="card mb-5">
        <div className="card-body card-body-border">
          <p className="card-text">{content}</p>
        </div>

        {imageUrl &&
          <div className="card-body card-body-border">
            <img className="card-img-top" src={imageUrl} height="250" alt="Card"  />
          </div>
        }

        {Boolean(comments.length) &&
          <div className="card-body p-2">
            {comments.map(comment => (
              <div
                key={comment.id}
                className="bg-light alert alert-secondary p-2 mb-1"
                role="alert"
              >
                <b>{comment.author}: </b>
                <span>{comment.content}</span>
              </div>
            ))}
          </div>
        }

        <div className="card-footer p-1">
          <input
            ref={ref=>this.commentTextRef = ref}
            type="text"
            className="form-control nooutline"
            placeholder="Escribe un comentario..."

          />
        </div>
        
      </div>
    )
  }
}
 
export default Post

//root.js
<Post 
  comments={[
    {
      id:1,
      author: "Ik",
      content: "Que tal"
    }
  ]}
  content="Hola como estas?"
  imageUrl="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2w.."
/>
```
- ![](https://trello-attachments.s3.amazonaws.com/5e0fa0a19672dd8191827199/557x709/696262cbcd55f2dd691741085b276cba/image.png)

### [Instalación de Json server](https://youtu.be/o_IsXVq8QBo?t=930)
- `npm i json-server `
```js
//crear fichero src/dbjson/api.json
{
  "comments":[
    {
      "id":1
    }
  ],
  "posts": [
    
  ]
}

//package.json
  ... 
  "json-server": "^0.15.1",
  ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    //creo script de llamada: npm run api
    "api": "json-server --watch ./src/dbjson/api.json --port 4000"
  },

//crear  src/services/api.js
```
- ![](https://trello-attachments.s3.amazonaws.com/5e0fa0a19672dd8191827199/696x346/1ab0c6ceb7f4ad9ba6df4a90b66a9b0f/image.png)

### [Instalación de axios](https://youtu.be/o_IsXVq8QBo?t=1104)
- `npm i axios`
```js
//api.js
import axios from "axios"

const reqhelper = axios.create({
  baseURL: "http://localhost:4000"
})

const objroutes = {
  posts: {
    get: () => reqhelper({
      url: "posts",
      method: "get",
    }),

    create: data => reqhelper({
      url: "posts",
      method: "post",
      data,
    })

  },

  comments: {
    get: () => reqhelper({
      url: "comments",
      method: "get",
    }),

    create: data => reqhelper({
      url: "comments",
      method: "post",
      data,
    })  }
}//objroutes

export default objroutes
```
- [probando api - axios en Root](https://youtu.be/o_IsXVq8QBo?t=1372)
```js
import api from "../services/api"

class Root extends Component {
  state = {}

  componentDidMount(){
    //this.props.action1(777)
    api.comments.create({author: "eaf", content:"x y z"})
  }

//api.json
{
  "comments": [
    {
      "id": 1
    },
    {
      "author": "eaf",
      "content": "x y z",
      "id": 2
    },
    {
      "author": "eaf",
      "content": "x y z",
      "id": 3
    }
  ],
  "posts": []
}
```

### TO-DO
- Crear reducers con prefijo