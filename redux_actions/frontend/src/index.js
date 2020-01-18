//index.js
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Root from "./components/root"
import objstore from "./redux/objstore"
import "./style.css"

const nodes = (
  //el store es el almacen del estado
  //el provider hace visible ese almacen a todo el "dom"
  <Provider store={objstore}>
    <Root/>
  </Provider>
)
console.log("index.js nodes:",nodes," typeof nodes:",typeof nodes)
ReactDOM .render(nodes, document.getElementById("root"))