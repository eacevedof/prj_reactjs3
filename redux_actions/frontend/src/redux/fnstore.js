//store.js
//El store es una función que agrupa un conjunto de funciones setters (reducers)
import {createStore, combineReducers} from "redux";
//los reducers son funciones que setean el estado
import rdposts from "./reducers/rdposts"
import fn_rdcomments from "./reducers/rdcomments"

const fnreducer = combineReducers({
  //cada llave debe ser un fnreducer
  rdposts,
  fn_rdcomments,
})

console.log("typeof:",typeof fnreducer,"fnreducer", fnreducer)

//middleware o store inhances
const fnstore = createStore(fnreducer)

export default fnstore;