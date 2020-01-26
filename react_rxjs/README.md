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
- https://youtu.be/Urv82SGIu_0?t=1022
- Esto funciona sin utilizar get_async_pokemon_name solo con behavioursubject
```js
//src/components/rxjs1.js
import React, { useState, useEffect } from 'react';
import {from, BehaviorSubject} from "rxjs"
import {map, filter, delay, mergeMap} from "rxjs/operators"

const get_async_pokemon_name = async name => {
  const {results: allPokemons} = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000").then(result => result.json)
  return allPokemons.filter(pokemon => pokemon.name.includes(name))
}

const objsubject = new BehaviorSubject("")

function Rxjs1() {
  const [search, set_search] = useState("")
  const [results, set_results] = useState([])

  useEffect(()=>{
    console.log("useEffect subscribe")
    const objsuscription = objsubject.subscribe( r => {
      console.log("observer called r:",r);
      set_results(r)
    })

    console.log("calling objsuscription.unsubscribe")
    return () => objsuscription.unsubscribe()

  },[])//useEffect

  const on_change = e => {
    const strnew = e.target.value
    set_search(strnew)
    objsubject.next(strnew)
  }

  return (
    <>
      <input 
        type="text" 
        placeholder="Search" 
        value={search} 
        onChange={on_change}
      />
      <div>
        {JSON.stringify(results, null, 2)}
      </div>
    </>
  )

}//function Rxjs1 (hook)

export default Rxjs1
```
- Con este código ya se pinta la respuesta en el navegador
```js
//src/components/rxjs1.js
import React, { useState, useEffect } from 'react';
import {from, BehaviorSubject} from "rxjs"
import {map, filter, delay, mergeMap, debounceTime, distinctUntilChanged} from "rxjs/operators"

const get_async_pokemon_name = async name => {
  console.log("get_async_pokemon_name.name",name)
  const objpromise = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")//.then(result => result.json)
  const objjson = await objpromise.json()
  const allpokemons = objjson.results
  //console.log("allpokemons:",allpokemons)
  return allpokemons.filter(pokemon => pokemon.name.includes(name))
}

const objsubject = new BehaviorSubject("")
const result$ = objsubject.pipe(
  filter(str => str.length>0),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap(str => from(get_async_pokemon_name(str)))
)

function Rxjs1() {
  const [search, set_search] = useState("")
  const [results, set_results] = useState([])

  useEffect(()=>{
    console.log("useEffect subscribe")
    const objsuscription = result$.subscribe( r => {
      console.log("observer called r:",r);
      set_results(r)
    })

    console.log("calling objsuscription.unsubscribe")
    return () => objsuscription.unsubscribe()

  },[])//useEffect

  const on_change = e => {
    const strnew = e.target.value
    set_search(strnew)
    objsubject.next(strnew)
  }

  return (
    <>
      <input 
        type="text" 
        placeholder="Search" 
        value={search} 
        onChange={on_change}
      />
      <div>
        {JSON.stringify(results, null, 2)}
      </div>
    </>
  )

}//function Rxjs1 (hook)

export default Rxjs1
```
- Código final comentado
```js
//src/components/rxjs1.js
import React, { useState, useEffect } from 'react';
import {from, BehaviorSubject} from "rxjs"
import {filter, mergeMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators"

const get_async_pokemon_name = async name => {
  console.log("get_async_pokemon_name.name",name)
  const objpromise = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")//.then(result => result.json)
  const objjson = await objpromise.json()
  const allpokemons = objjson.results
  //console.log("allpokemons:",allpokemons)
  return allpokemons.filter(pokemon => pokemon.name.includes(name))
}

//al principio es un observable con estado inicial yyy
//despues de inicializarse generará otro observable a partir de este estado
//cada vez que haya un cambio en el input se forzará una emisión 
const behavsubj$ = new BehaviorSubject("yyy")

const async$ = behavsubj$.pipe(
  tap(str => console.log("ini behavsubj$ str:",str)),
  filter(str => str.length>0),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap(str => from(get_async_pokemon_name(str))),
  tap(array => console.log("end behavsubj$ array:",array)),
)
//async$ es annonymousSubject
console.log("type of async$:",typeof async$,async$)
console.log("behavsubj$ y async$ configurados...")

function Rxjs1() {
  console.log("starting Rxjs1()")
  const [search, set_search] = useState("")
  //set_results observará a async$
  const [results, set_results] = useState([])

  useEffect(()=>{
    console.log("useEffect() suscribing to async$")
    const subscriber = async$.subscribe( array => {
      console.log("dentro de async$.subscribe")
      set_results(array)
    })

    console.log("unsubscribing from async$",subscriber)
    return () => subscriber.unsubscribe()

  },[])//useEffect

  const on_change = e => {
    const strnew = e.target.value
    set_search(strnew)
    //aqui actua como observador
    console.log("on_change: llmamando a behavsubj$.next() con strnew",strnew)
    behavsubj$.next(strnew)
  }

  return (
    <>
      <input 
        type="text" 
        placeholder="Search" 
        value={search} 
        onChange={on_change}
      />
      <div>
        {
          results.map(pokemon => (
            <div key={pokemon.name}>
              {pokemon.name}
            </div>
          ))
        }
      </div>
    </>
  )

}//function Rxjs1 (hook)

export default Rxjs1
```
- Resultado:
- Al cargar:
```js
HMR] Waiting for update signal from WDS...
rxjs1.js:29 type of async$: object AnonymousSubject {_isScalar: false, observers: Array(0), closed: false, isStopped: false, hasError: false, …}
rxjs1.js:30 behavsubj$ y async$ configurados...
rxjs1.js:33 starting Rxjs1()
rxjs1.js:39 useEffect() suscribing to async$
rxjs1.js:20 ini behavsubj$ str: yyy
rxjs1.js:45 unsubscribing from async$ Subscriber {closed: false, _parentOrParents: null, _subscriptions: Array(1), syncErrorValue: null, syncErrorThrown: false, …}
rxjs1.js:7 get_async_pokemon_name.name yyy
rxjs1.js:20 end behavsubj$ array: []
rxjs1.js:41 dentro de async$.subscribe
rxjs1.js:33 starting Rxjs1()
```
- Al buscar:
```js
on_change: llmamando a behavsubj$.next() con strnew p
rxjs1.js:20 ini behavsubj$ str: p
rxjs1.js:33 starting Rxjs1()
rxjs1.js:54 on_change: llmamando a behavsubj$.next() con strnew po
rxjs1.js:20 ini behavsubj$ str: po
rxjs1.js:33 starting Rxjs1()
rxjs1.js:54 on_change: llmamando a behavsubj$.next() con strnew pok
rxjs1.js:20 ini behavsubj$ str: pok
rxjs1.js:33 starting Rxjs1()
rxjs1.js:7 get_async_pokemon_name.name pok
rxjs1.js:20 end behavsubj$ array: [{…}]
rxjs1.js:41 dentro de async$.subscribe
rxjs1.js:33 starting Rxjs1()
```