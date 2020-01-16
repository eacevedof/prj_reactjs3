//rdcomments.js
import { handleActions } from "redux-actions"
import { ac_insertcomment, ac_getcomments } from  "../actions"

export default handleActions ({
  [ac_insertcomment] : (state, action) => {
    //action.payload va a tener el comment que queremos agregar
    return [...state, action.payload]
  },

  [ac_getcomments] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions
