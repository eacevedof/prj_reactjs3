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