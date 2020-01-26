//src/components/rxjs1.js
import React, { Component } from 'react';
import {from} from "rxjs"
import {map, filter} from "rxjs/operators"

const objnumbers$ = from([1,2,3,4,5])

const objsquared$ = objnumbers$.pipe(
  filter(val => val >2),
  map(val => val * val)
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