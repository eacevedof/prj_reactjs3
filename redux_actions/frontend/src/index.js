//index.js
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Root from "./components/root"
import fnstore from "./redux/fnstore"
import "./style.css"

const nodes = (
  //el store es el almacen del estado
  //el provider hace visible ese almacen a todo el "dom"
  <Provider store={fnstore}>
    <Root/>
  </Provider>
)
ReactDOM .render(nodes, document.getElementById("root"))