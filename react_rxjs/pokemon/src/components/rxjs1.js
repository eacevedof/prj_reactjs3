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

  

  },[])//useEffect

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