//rdposts.js
import { handleActions } from "redux-actions"
import { ac_insertpost_ok, ac_getposts_ok } from  "../actions"


export default handleActions ({
  [ac_insertpost_ok] : (state, action) => {
    //action.payload va a tener el post que queremos agregar
    console.log("insertpost: action.payload",action.payload)
    return [...state, action.payload]
  },

  [ac_getposts_ok] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions

