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