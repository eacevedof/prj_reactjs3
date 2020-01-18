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
import fn_thunk from "redux-thunk" 
//los reducers son funciones que setean el estado
import fn_rdposts from "./reducers/rdposts"
import fn_rdcomments from "./reducers/rdcomments"


const fn_rdcombined = combineReducers({
  //cada llave debe ser un fnreducer
  fn_rdposts,
  fn_rdcomments,
})

console.log("objstore.js: thunk: ",fn_thunk)
/** 
objstore.js fn_thunk:  ƒ (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return…
*/

//middleware o store inhances
const objstore = createStore(fn_rdcombined, applyMiddleware(fn_thunk))
console.log("objstore.js: objstore",objstore)
export default objstore;