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
### [reconfigurando las acciones y los reducers](https://youtu.be/o_IsXVq8QBo?t=1488)
```js
//definimos las acciones globales
//actions.js
import { createAction } from "redux-actions"

export const ac_insertpost = createAction("ac_insertpost")
export const ac_getposts = createAction("ac_getposts")

export const ac_insertcomment = createAction("ac_insertcomment")
export const ac_getcomments = createAction("ac_getcomments")

//rdcomments.js
import { handleActions } from "redux-actions"
import { ac_insertcomment, ac_getcomments } from  "../actions"

export default handleActions ({
  [ac_insertcomment] : (state, action) => {
    //action.payload va a tener el comment que queremos agregar
    return [...state, action.payload]
  },

  [ac_getcomments] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions
```
- parece un poco repetición de código pero al ser un proyecto tan sencillo lo dejamos así
- si esto creciera demasiado entonces habria que replantearse un cambio de estructura

### [Conectando los reducers a nuestro componente Root](https://youtu.be/o_IsXVq8QBo?t=1726)
```js
//root.js
import React, { Component } from 'react'
import { connect } from "react-redux"
import { action1, ac_getcomments } from "../redux/actions"
import Layout from "./layout"
import PostAdmin from "./postAdmin"
import Post from "./post"
import api from "../services/api"
import {
  ac_getposts as acgetposts,
  ac_insertpost as acinsertpost,
  ac_getcomments as acgetcomments,
  ac_insertcomment as acinsertcomment,
} from "../redux/actions"


class Root extends Component {
  state = {}

  //como document.ready
  componentDidMount(){
    console.log("componentDidMount(): this.props",this.props)
    //this.props.action1(777)
    //api.comments.create({author: "eaf", content:"x y z"})
    //gracias a mapdispatchtoprops
    const {ac_getposts, ac_getcomments} = this.props

    //fuerzo carga inicial para demo llamando a las acciones
    ac_getposts([
      {
        "id":123,
        "content": "hola"
      }
    ])

    ac_getcomments([
      {
        "id": 1,
        "postid": 123,
        "author": "leo",
        "content": "que tal"
      }
    ])

  }//componentDidMount

  render(){
    console.log("render(): this.props",this.props)
    const {
      //esto lo proporciona mapstatetoprops y los reducers
      comments,
      posts,

      //y esto mapdispatchtoprops y las acciones
      //ac_getcomments,
      //ac_getposts,      
      //ac_insertcomment,
      //ac_insertpost,
    } = this.props

    return (
      <div>
        <Layout>
          <PostAdmin />
          {posts.map(post => (
            <Post 
              key={post.id}
              content={post.content}
              imageUrl={post.image}
              comments={comments.filter(comment => comment.postid === post.id)}
            />
          ))}
        </Layout>
      </div>
    )//return

  }//Render

}//class Root

const mapStateToProps = (state) => {
  //queremos tener acceso (al estado) a los comentarios y a post
  return {
    //fnstore devuelve la funcion agrupada de reducers 
    //con esta definición hacemos posible que Root pueda acceder al estado
    comments: state.fn_rdcomments,
    posts: state.fn_rdposts,
  }
}

//te publica en props las acciones y que estas a su vez te permiten interactuar 
//con el estado
const mapDispatchToProps = {
  ac_getposts: acgetposts,
  ac_getcomments: acgetcomments,
  ac_insertpost: acinsertpost,
  ac_insertcomment: acinsertcomment
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
```
# [configurando nuevos comentarios y nuevos posts](https://youtu.be/o_IsXVq8QBo?t=2182)
```js
//root.js
...
      //ac_getposts,      
      ac_insertcomment,
      ac_insertpost,
    } = this.props

    return (
      <div>
        <Layout>
          <PostAdmin />
          {posts.map(post => (
            <Post 
              key={post.id}
              postid={post.id}
              author="Guest"
              content={post.content}
              imageUrl={post.image}
              comments={comments.filter(comment => comment.postid === post.id)}
              fn_insertcomment={ac_insertcomment}
            />
          ))}
        </Layout>
      </div>
    )//return

//post.js
import React, { Component } from 'react';

class Post extends Component {
  state = {  }
  render() { 
    const {
      postid,
      author,
      content,
      imageUrl,
      comments,
      fn_insertcomment, //viene de Root.actions.ac_insertcomment
    } = this.props
...
  <div className="card-footer p-1">
    <input
      ref={ref=>this.commentTextRef = ref}
      type="text"
      className="form-control nooutline"
      placeholder="Escribe un comentario..."
      onKeyPress={(e)=>{
        if(e.key === "Enter"){
          //Root.actions.ac_insertcomment
          fn_insertcomment({
            //el contenido que queremos crear en el comentario
            postid: postid,
            author: author,
            content: this.commentTextRef.value
          })

          this.commentTextRef.value = ""
        }
      }}
    />
  </div>
...
```
### [ejecutando la lógica similar a la anterior en PostAdmi](https://youtu.be/o_IsXVq8QBo?t=2461)
- [función con promesa getBase64(image)](https://youtu.be/o_IsXVq8QBo?t=2820)
```js
//postAdmin.js
import React, {Component} from "react";

function getAsyncBase64(file){
  return new Promise((fn_resolve,fn_reject) => {
    const reader = new FileReader()
    reader.onload = ()=> fn_resolve(reader.result)
    //reader.onerror = (error) => fn_reject(error) lo mismo
    reader.onerror = fn_reject
    reader.readAsDataURL(file)
  })
}

class PostAdmin extends Component {
  state = {}

  render(){

    const {fn_insertpost} = this.props

    return (
      <form
        // pasa a async ya que hay una función que devuelve una promesa
        onSubmit={ async (e) => {
          e.preventDefault()
          
          //debugger
          let strimage = ""
          if(this.imageRef.files.length>0){
            const objimg = this.imageRef.files[0]
            strimage = await getAsyncBase64(objimg)
            console.log("strimage:",strimage)
          }

          //Root.actions.ac_insertpost
          fn_insertpost({
            id: Date.now(),
            image: strimage,
            content: this.textRef.value,
          })

          this.imageRef.value = ""
          this.textRef.value = ""

        }}//onSubmit
      >

//root.js
return (
  <div>
    <Layout>
      <PostAdmin fn_insertpost={ac_insertpost} />
      {
        posts.map(post => ( 
          <Post 
            key={post.id}
            postid={post.id}
            author="Guest"
            content={post.content}
            imageUrl={post.image}
            comments={comments.filter(comment => comment.postid === post.id)}
            fn_insertcomment={ac_insertcomment}
          />
        ))
      }
    </Layout>
  </div>
)//return
```
## [Parte 3](https://youtu.be/Q_e42GPpSrE)
- Vamos a conectar las acciones para que funcionen de una manera asincrona
- Las acciones se conectarán a la API con **redux-thunk**
- Estamos usando "actions.js" **redux-actions** y este tipo de acciones no soporta código asincrono
- Por lo tanto vamos a usar un thunk
- `npm i redux-thunk`
- [Explicación de como funciona redux-thunk](https://youtu.be/Q_e42GPpSrE?t=186)
- [Configuración middleware logger](https://youtu.be/Q_e42GPpSrE?t=517)
```js
export const ac_insertpost = createAction("ac_insertpost")
export const ac_getposts = createAction("ac_getposts")

export const ac_insertcomment = createAction("ac_insertcomment")
export const ac_getcomments = createAction("ac_getcomments")

//estas acciones no son totalmente compatibles con redux-thunk

//actualmente se tiene algo como esto
const todo = () => {
    return {
        type: "",
        payload: "",
    }
}

//se necesita esto, que devuelva una función ya thunk usa middlewares
// más sobre middlewares: https://www.youtube.com/watch?v=sVHCWrh1vYM
const todo = () => {
    return () => {

    }
}
//cuando se llama a ac_getposts([]) se está emitiendo una acción,
//esta tiene que pasar por los reducers, cada reducer recibe las acciones
//y estos modifican el estado basandose en la acción
//El trayecto es: punto inicial: cuando emites una acción, por ejemplo en 
//componentDidMount().ac_getposts([])
//Cuando la recibes en un reducer es el último punto
//Entre estos dos puntos se puede inyectar una lógica y es lo que se entiende como middleware

//como esta acción pasará por el middleware antes de llegar al reducer
//el middleware espera que retorne una función que puede ser asincrona

const todo = () => {
  return async (fn_dispatch) => {
    const d = await get_asyncdata()
    //una vez que se tiene los datos entonces se puede llamar a la accion
    fn_dispatch({
      type: "",
      payload: d
    })
  }
}

//objstore.js
//implementa el patron observador
/*
dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, Symbol(observable): ƒ}
dispatch: fn_action => {…}
subscribe: ƒ subscribe(listener)
getState: ƒ getState()
replaceReducer: ƒ replaceReducer(nextReducer)
Symbol(observable): ƒ observable()
__proto__: Object
*/
// Ejemplo Middleware
//defino el middleware
//se ejecuta entre componentDidMount() y rd*.actionX
//todas las acciones emitidas pasaran por aqui 
const fn_logger = (objstore) => (fn_next) => (fn_action) => {
  console.log("objstore.middleware.fn_logger.action",fn_action)
  fn_next(fn_action)
  // objstore.dispatch({type:"aaa",payload:"b"})
}

//middleware o store inhances
const objstore = createStore(fn_rdcombined, applyMiddleware(fn_logger))
console.log("objstore.js objstore",objstore)
export default objstore;
```
- [Configurando actions de modo asincrono y con services/api.js](https://youtu.be/Q_e42GPpSrE?t=910)
```js
//actions.js
import { createAction } from "redux-actions"
import api from "../services/api"

export const ac_getposts_ok = createAction("ac_getposts_ok")
export const ac_getposts_nok = createAction("ac_getposts_nok")
export const ac_getposts = () => async fn_dispatch => {
  try {
    console.log("ac_getposts fn_dispatch",typeof fn_dispatch, fn_dispatch)
    const response = await api.posts.get()
    console.log("ac_getposts response.data",response.data)
    fn_dispatch( ac_getposts_ok(response.data) )
  
  }
  catch (err) {
    fn_dispatch(ac_getposts_nok(err))
  }
}// ac_getposts


export const ac_insertpost_ok = createAction("ac_insertpost_ok")
export const ac_insertpost = (data) => async fn_dispatch => {
  try {
    console.log("ac_insertpost fn_dispatch",typeof fn_dispatch, fn_dispatch)
    const response = await api.posts.create(data)
    console.log("response.data",response.data)
    fn_dispatch( ac_insertpost_ok(response.data) )
  
  }
  catch (err) {
    fn_dispatch(ac_getposts_nok(err))
  }
}// ac_insertpost

export const ac_getcomments_ok = createAction("ac_getcomments_ok")
export const ac_getcomments_nok = createAction("ac_getcomments_nok")
export const ac_getcomments = () => async fn_dispatch => {
  try {
    console.log("ac_getcomments fn_dispatch",typeof fn_dispatch, fn_dispatch)
    const response = await api.comments.get()
    console.log("ac_getcomments response.data",response.data)
    fn_dispatch( ac_getcomments_ok(response.data) )
  }
  catch (err) {
    fn_dispatch(ac_getcomments_nok(err))
  }
}// ac_getcomments


export const ac_insertcomment_ok = createAction("ac_insertcomment_ok")
export const ac_insertcomment = (data) => async fn_dispatch => {
  try {
    const response = await api.comments.create(data)
    console.log("ac_insertcomment response.data",response.data)
    fn_dispatch( ac_insertcomment_ok(response.data) )  
  }
  catch (err) {
    fn_dispatch(ac_getcomments_nok(err))
  }
}// ac_insertcomment

//rdcomments.js
import { handleActions } from "redux-actions"
import { ac_insertcomment_ok, ac_getcomments_ok } from  "../actions"

export default handleActions ({
  [ac_insertcomment_ok] : (state, action) => {
    //action.payload va a tener el comment que queremos agregar
    return [...state, action.payload]
  },

  [ac_getcomments_ok] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions

//rdposts.js
import { handleActions } from "redux-actions"
import { ac_insertpost_ok, ac_getposts_ok } from  "../actions"

export default handleActions ({
  [ac_insertpost_ok] : (state, action) => {
    //action.payload va a tener el post que queremos agregar
    console.log("ac_insertpost_ok: action.payload",action.payload)
    return [...state, action.payload]
  },

  [ac_getposts_ok] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions
```
### Flujo Primera carga
```js
objstore.js: thunk:  ƒ (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return…
objstore.js:38 objstore.js: objstore {dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, Symbol(observable): ƒ}
index.js:16 index.js nodes: 
  {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}$$typeof: Symbol(react.element)type: ƒ Provider(_ref)key: nullref: nullprops: {store: {…}, children: {…}}_owner: null_store: {validated: false}_self: null_source: {fileName: "/Users/ioedu/projects/prj_reactjs3/redux_actions/frontend/src/index.js", lineNumber: 12}__proto__: Object  typeof nodes: object
root.js:46 root.js Root.render: this.props 
  {comments: Array(0), posts: Array(0), ac_getposts: ƒ, ac_getcomments: ƒ, ac_insertpost: ƒ, …}comments: []posts: []ac_getposts: ƒ ()ac_getcomments: ƒ ()ac_insertpost: ƒ ()ac_insertcomment: ƒ ()__proto__: Object
layout.js:5 layout.js Layout props  
  {children: Array(2)}children: Array(2)0: {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}$$typeof: Symbol(react.element)type: class PostAdminkey: nullref: nullprops: {fn_insertpost: ƒ}_owner: FiberNode {tag: 1, key: null, stateNode: Root, elementType: ƒ, type: ƒ, …}_store: {validated: true}_self: Root {props: {…}, context: {…}, refs: {…}, updater: {…}, state: {…}, …}_source: {fileName: "/Users/ioedu/projects/prj_reactjs3/redux_actions/frontend/src/components/root.js", lineNumber: 50}__proto__: Object1: []length: 2__proto__: Array(0)__proto__: Object
postAdmin.js:24 postAdmin.js props:  
  {fn_insertpost: ƒ}fn_insertpost: ƒ ()__proto__: Object
root.js:21 root.js Root.componentDidMount(): this.props 
  {comments: Array(0), posts: Array(0), ac_getposts: ƒ, ac_getcomments: ƒ, ac_insertpost: ƒ, …}comments: []posts: []ac_getposts: ƒ ()ac_getcomments: ƒ ()ac_insertpost: ƒ ()ac_insertcomment: ƒ ()__proto__: Object
root.js:25 root.js Root.componentDidMount() calling async ac_getposts y ac_getcomments begin
actions.js:8 actions.js ac_getposts.async fn_dispatch: ƒ dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
root.js:28 root.js Root.componentDidMount() calling async ac_getposts y ac_getcomments end
webpackHotDevClient.js:137 ./src/index.js
  Line 17:1:  Unexpected whitespace before property render  no-whitespace-before-property
printWarnings @ webpackHotDevClient.js:137
handleWarnings @ webpackHotDevClient.js:142
push../node_modules/react-dev-utils/webpackHotDevClient.js.connection.onmessage @ webpackHotDevClient.js:209
actions.js:41 actions.js ac_getcomments response.data []length: 0__proto__: Array(0)
rdcomments.js:13 rdcomments.js handleActions.ac_getcomments_ok.state []
rdcomments.js:14 rdcomments.js handleActions.ac_getcomments_ok.action 
  {type: "ac_getcomments_ok", payload: Array(0)}type: "ac_getcomments_ok"payload: []__proto__: Object
root.js:46 root.js Root.render: this.props 
  {comments: Array(0), posts: Array(0), ac_getposts: ƒ, ac_getcomments: ƒ, ac_insertpost: ƒ, …}comments: []posts: []ac_getposts: ƒ ()ac_getcomments: ƒ ()ac_insertpost: ƒ ()ac_insertcomment: ƒ ()__proto__: Object
layout.js:5 layout.js Layout props  
  {children: Array(2)}children: (2) [{…}, Array(0)]0: {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}1: []length: 0__proto__: Array(0)length: 2__proto__: Array(0)__proto__: Object
postAdmin.js:24 postAdmin.js props:  
  {fn_insertpost: ƒ}
actions.js:11 actions.js ac_getposts response.data (2) [{…}, {…}]
actions.js:12 actions.js ac_getposts llamando al reducer handleActions.ac_getposts_ok
rdposts.js:14 rdposts.js handleActions.ac_getposts_ok.state []
rdposts.js:15 rdposts.js handleActions.ac_getposts_ok.action 
  {type: "ac_getposts_ok", payload: Array(2)}type: "ac_getposts_ok"payload: Array(2)0: {id: 1579287381285, image: "data:image/jpeg;base64,/9j/4AAQSkZJ", content: ""}1: {id: 1579290352411, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD…44XzZ8nd/EwP973FFFcdBv2gzihyTUi8LyWA9qKK7XsLqf//Z", content: "Mi optimus"}length: 2__proto__: Array(0)__proto__: Object
root.js:46 root.js Root.render: this.props 
  {comments: Array(0), posts: Array(2), ac_getposts: ƒ, ac_getcomments: ƒ, ac_insertpost: ƒ, …}comments: []posts: (2) [{…}, {…}]0: {id: 1579287381285, image: "data:image/jpeg;base64,/9j/4AAQSkZJR", content: ""}1: {id: 1579290352411, image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD…44XzZ8nd/EwP973FFFcdBv2gzihyTUi8LyWA9qKK7XsLqf//Z", content: "Mi optimus"}length: 2__proto__: Array(0)ac_getposts: ƒ ()ac_getcomments: ƒ ()ac_insertpost: ƒ ()ac_insertcomment: ƒ ()__proto__: Object
layout.js:5 layout.js Layout props  
  {children: Array(2)}children: (2) [{…}, Array(2)]0: {$$typeof: Symbol(react.element), key: null, ref: null, props: {…}, type: ƒ, …}1: (2) [{…}, {…}]length: 2__proto__: Array(0)__proto__: Object
postAdmin.js:24 postAdmin.js props:  
  {fn_insertpost: ƒ}
post.js:7 posts.js Post.render.props 
  {postid: 1579287381285, author: "Guest", content: "", imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ", comments: Array(0), …}
post.js:7 posts.js Post.render.props 
  {postid: 1579290352411, author: "Guest", content: "Mi optimus", imageUrl: "data:image/jpeg;base64,/9j/4AAQSk", comments: Array(0), …}
```
### Flujo insert post
```js
postAdmin.js getAsyncBase64: file File {name: "Captura de pantalla 2020-01-15 a las 21.38.21.png", lastModified: 1579120706857, lastModifiedDate: Wed Jan 15 2020 21:38:26 GMT+0100 (hora estándar de Europa central), webkitRelativePath: "", size: 1831663, …}
actions.js ac_insertpost.fn_dispatch: data => async fn_dispatch => {
  console.log("actions.js ac_insertpost.fn_dispatch:", ac_insertpost);

  try {
    const response = await _services_api__WEBPACK_IMPORTED_MODULE_1__["default"].posts.c…
actions.js:26 actions.js ac_insertpost response.data {id: 1579355103968, image: "data:image/png;base64,+H8VLyYVGMY0kQAAAABJRU5ErkJggg==", content: "un nuevo post"}
rdposts.js:8 rdposts.js handleActions.ac_insertpost_ok.state (2) [{…}, {…}]
rdposts.js:9 rdposts.js handleActions.ac_insertpost_ok.action {type: "ac_insertpost_ok", payload: {…}}
root.js:46 root.js Root.render: this.props {comments: Array(0), posts: Array(3), ac_getposts: ƒ, ac_getcomments: ƒ, ac_insertpost: ƒ, …}
layout.js:5 layout.js Layout props  {children: Array(2)}
postAdmin.js:24 postAdmin.js props:  {fn_insertpost: ƒ}
post.js:7 posts.js Post.render.props {postid: 1579287381285, author: "Guest", content: "", imageUrl: "data:image/jpeg;base64,/9j/=", comments: Array(0), …}
post.js:7 posts.js Post.render.props {postid: 1579290352411, author: "Guest", content: "Mi optimus", imageUrl: "data:image/jpeg;base64,/9j/", comments: Array(0), …}
post.js:7 posts.js Post.render.props {postid: 1579355103968, author: "Guest", content: "un nuevo post", imageUrl: "data:image/png;base64,+", comments: Array(0), …}
```
### Flujo insert comment
```js
actions.js ac_insertcomment response.data {postid: 1579355103968, author: "Guest", content: "comentario aaa", id: 1}
rdcomments.js:7 rdcomments.js handleActions.ac_insertcomment_ok.state []
rdcomments.js:8 rdcomments.js handleActions.ac_insertcomment_ok.action {type: "ac_insertcomment_ok", payload: {…}}
root.js:46 root.js Root.render: this.props {comments: Array(1), posts: Array(3), ac_getposts: ƒ, ac_getcomments: ƒ, ac_insertpost: ƒ, …}
layout.js:5 layout.js Layout props  {children: Array(2)}
postAdmin.js:24 postAdmin.js props:  {fn_insertpost: ƒ}
post.js:7 posts.js Post.render.props {postid: 1579287381285, author: "Guest", content: "", imageUrl: "data:image/jpeg;base64,/9j", comments: Array(0), …}
post.js:7 posts.js Post.render.props {postid: 1579290352411, author: "Guest", content: "Mi optimus", imageUrl: "data:image/jpeg;base64,/9", comments: Array(0), …}
post.js:7 posts.js Post.render.props {postid: 1579355103968, author: "Guest", content: "un nuevo post", imageUrl: "data:image/png;base64,", comments: Array(1), …}
```

### Notas
- Los reducers son como los getters y setters de la entidad que se encuentra en el estado