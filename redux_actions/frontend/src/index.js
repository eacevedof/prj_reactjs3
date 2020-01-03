//index.js
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Root from "./components/root"

const nodes = (
  <Root/>
)
ReactDOM .render(nodes, document.getElementById("root"))