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