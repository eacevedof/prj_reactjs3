//src/components/root.js
import React, { Component } from 'react';
import "../style.css"

import Rxjs1 from "./rxjs1"

export default class Root extends Component {
  state = {}
  render(){
    return (
      <>
        <Rxjs1 />
      </>
    )
  }
}