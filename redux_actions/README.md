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
### TO-DO
- Crear reducers con prefijo