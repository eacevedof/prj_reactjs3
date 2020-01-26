//src/components/rxjs1.js
import React, { Component } from 'react';
import {from} from "rxjs"
import {map, filter} from "rxjs/operators"

const objnumbers$ = from([1,2,3,4,5])

const objsquared$ = objnumbers$.pipe(
  filter(val => val >2),
  map(val => val * val)
)

const objsuscription = objsquared$.subscribe(r => {
  console.log("observer called r:",r);
  //esto no tira según el ejemplo: https://youtu.be/Urv82SGIu_0?t=306
  //solo se imprimiria 9
  //objsuscription.unsubscribe()
})

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