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
### TO-DO
- Crear reducers con prefijo