//rdposts.js
import { handleActions } from "redux-actions"
import { ac_insertpost, ac_getposts } from  "../actions"


export default handleActions ({
  [ac_insertpost] : (state, action) => {
    //action.payload va a tener el post que queremos agregar
    console.log("insertpost: action.payload",action.payload)
    return [...state, action.payload]
  },

  [ac_getposts] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions

