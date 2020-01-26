### [Youtube - How to use RxJS with React Hooks](https://www.youtube.com/watch?v=Urv82SGIu_0)

- [Ejemplo con subscribe y unsubscribe](https://youtu.be/Urv82SGIu_0?t=480)
```js
//src/components/rxjs1.js
import React, { Component } from 'react';
import {from} from "rxjs"
import {map, filter, delay, mergeMap} from "rxjs/operators"

const objnumbers$ = from([1,2,3,4,5])

const objsquared$ = objnumbers$.pipe(
  filter(n => n > 2),
  mergeMap(n => from([n]).pipe(delay(1000 * n))),
  map(n => n * n)
)

class Rxjs1 extends Component {

  constructor(){
    super()
    //aqui no vale setState pq el componente no esta renderizado
    this.state = {currnumber:0}
  }

  componentDidMount(){
    console.log("componentDidMount","subscribe")
    this.objsuscription = objsquared$.subscribe( r => {
      console.log("observer called r:",r);
      this.setState({currnumber: r})
      //this.objsuscription.unsubscribe()
    })
  }

  componentWillUnmount(){
    console.log("componentWillUnmount","unsubscribe")
    this.objsuscription.unsubscribe()
  }

  render(){
    return (
      <>
        Current number is {this.state.currnumber}
      </>
    )
  }

}//class Rxjs1 extends Component

export default Rxjs1
```
### [El ejemplo anterior con hooks](https://youtu.be/Urv82SGIu_0?t=579)
```js
//https://youtu.be/Urv82SGIu_0?t=678
//src/components/rxjs1.js
import React, { useState, useEffect } from 'react';
import {from} from "rxjs"
import {map, filter, delay, mergeMap} from "rxjs/operators"

const objnumbers$ = from([1,2,3,4,5])

const objsquared$ = objnumbers$.pipe(
  filter(n => n > 2),
  mergeMap(n => from([n]).pipe(delay(1000 * n))),
  map(n => n * n)
)

function Rxjs1() {

  const [currnumber, set_currnumber] = useState(0)

  useEffect(()=>{
    console.log("useEffect subscribe")
    const objsuscription = objsquared$.subscribe( r => {
      console.log("observer called r:",r);
      set_currnumber(r)
      //this.objsuscription.unsubscribe()
    })

    console.log("calling objsuscription.unsubscribe")
    return () => objsuscription.unsubscribe()

  },[])//useEffect

  return (
    <>
      Current number is {currnumber}
    </>
  )

}//function Rxjs1 (hook)

export default Rxjs1
```
### [No me va con hook externo](https://youtu.be/Urv82SGIu_0?t=730)
```js
//src/components/rxjs1.js
import React, { useState, useEffect } from 'react';
import {from} from "rxjs"
import {map, filter, delay, mergeMap} from "rxjs/operators"

const objnumbers$ = from([1,2,3,4,5])

const objsquared$ = objnumbers$.pipe(
  filter(n => n > 2),
  mergeMap(n => from([n]).pipe(delay(1000 * n))),
  map(n => n * n)
)

const hook_use_observable = (obs$, fn_setter) => {
  useEffect(()=>{
    const objsuscription = obs$.subscribe( r => {
      fn_setter(r)
    })

    return () => objsuscription.unsubscribe()

  },[obs$, fn_setter])//useEffect

}//hook_use_observable (hook)

function Rxjs1() {
  const [currnumber, set_currnumber] = useState(0)

  hook_use_observable(objsquared$, set_currnumber)

  return (
    <>
      Current number is {currnumber}
    </>
  )

}//function Rxjs1 (hook)

export default Rxjs1
```
```js
Failed to compile
./src/components/rxjs1.js
Line 15:3:  React Hook "useEffect" is called in function "hook_use_observable" which is neither a React function component or a custom React Hook function  react-hooks/rules-of-hooks
Search for the keywords to learn more about each error.
This error occurred during the build time and cannot be dismissed
```
### [Ejemplo con pokemon API](https://youtu.be/Urv82SGIu_0?t=770)