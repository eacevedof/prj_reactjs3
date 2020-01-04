//store.js
//El store es una función que agrupa un conjunto de funciones setters (reducers)
import {createStore, combineReducers} from "redux";
//los reducers son funciones que setean el estado
import posts from "./reducers/posts"
import comments from "./reducers/comments"

const reducer = combineReducers({
  //cada llave debe ser un reducer
  posts,
  comments,
})

//middleware o store inhances
const fnstore = createStore(reducer)

export default store;