//rdposts.js
import { handleActions } from "redux-actions"
import { ac_insertpost_ok, ac_getposts_ok } from  "../actions"

export default handleActions ({
  [ac_insertpost_ok] : (state, action) => {
    //action.payload va a tener el post que queremos agregar
    console.log("rdposts.js handleActions.ac_insertpost_ok.state",state)
    console.log("rdposts.js handleActions.ac_insertpost_ok.action",action)        
    return [...state, action.payload]
  },

  [ac_getposts_ok] : (state, action) => {  
    console.log("rdposts.js handleActions.ac_getposts_ok.state",state)
    console.log("rdposts.js handleActions.ac_getposts_ok.action",action)    
    return action.payload
  }
 },[])//handleActions

