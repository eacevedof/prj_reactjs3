//src/components/rxjs1.js
import React, { Component } from 'react';
import {from} from "rxjs"
import {map} from "rxjs/operators"

let objnumbers$ = from([1,2,3,4,5])
let objsquared$ = objnumbers$.pipe(
  map(val => val * val)
)

//observer
const fn_next = r => console.log("observer called","r:",r)

//observer a la escucha del array de numeros
objsquared$.subscribe(fn_next)

class Rxjs1 extends Component {
  state = {}
  render(){
    return (
      <>
        Rxjs1
      </>
    )
  }
}

export default Rxjs1