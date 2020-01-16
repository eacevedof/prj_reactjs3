//objstore.js
//implementa el patron observador
/*
dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, Symbol(observable): ƒ}
dispatch: fn_action => {…}
subscribe: ƒ subscribe(listener)
getState: ƒ getState()
replaceReducer: ƒ replaceReducer(nextReducer)
Symbol(observable): ƒ observable()
__proto__: Object
*/
import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk"
//los reducers son funciones que setean el estado
import fn_rdposts from "./reducers/rdposts"
import fn_rdcomments from "./reducers/rdcomments"


const fn_rdcombined = combineReducers({
  //cada llave debe ser un fnreducer
  fn_rdposts,
  fn_rdcomments,
})


//defino el middleware
//se ejecuta entre componentDidMount() y rd*.actionX
//todas las acciones emitidas pasaran por aqui 
const fn_logger = (objstore) => (fn_next) => (fn_action) => {
  console.log("objstore.middleware.fn_logger.action",fn_action)
  fn_next(fn_action)
  // objstore.dispatch({type:"aaa",payload:"b"})
}

//middleware o store inhances
const objstore = createStore(fn_rdcombined, applyMiddleware(fn_logger))
console.log("objstore.js objstore",objstore)
export default objstore;