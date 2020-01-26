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