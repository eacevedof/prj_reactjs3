//src/components/rxjs1.js
import React, { useState, useEffect } from 'react';
import {from, BehaviorSubject} from "rxjs"
import {map, filter, delay, mergeMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators"

const get_async_pokemon_name = async name => {
  console.log("get_async_pokemon_name.name",name)
  const objpromise = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1000")//.then(result => result.json)
  const objjson = await objpromise.json()
  const allpokemons = objjson.results
  //console.log("allpokemons:",allpokemons)
  return allpokemons.filter(pokemon => pokemon.name.includes(name))
}

//es observable y observer a la vez
//tiene un estado inicial que es de tipo singleton, es decir, cada vez que modifica su estado
//lo comparte a todos los observadores
const behavsubj$ = new BehaviorSubject("")

const async$ = behavsubj$.pipe(
  tap("behavsubj$ ini str:"),
  filter(str => str.length>0),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap(str => from(get_async_pokemon_name(str))),
  tap("behavsubj$ end str:"),
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
    const subscriber = async$.subscribe( r => {
      set_results(r)
    })

    console.log("unsubscribing from async$",subscriber)
    return () => subscriber.unsubscribe()

  },[])//useEffect

  const on_change = e => {
    const strnew = e.target.value
    set_search(strnew)
    //aqui actua como observador
    console.log("llmamando a behavsubj$.next() con strnew",strnew)
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