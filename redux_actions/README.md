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
