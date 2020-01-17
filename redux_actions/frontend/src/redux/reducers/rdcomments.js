//rdcomments.js
import { handleActions } from "redux-actions"
import { ac_insertcomment_ok, ac_getcomments_ok } from  "../actions"

export default handleActions ({
  [ac_insertcomment_ok] : (state, action) => {
    //action.payload va a tener el comment que queremos agregar
    return [...state, action.payload]
  },

  [ac_getcomments_ok] : (state, action) => {  
    return action.payload
  }
 },[])//handleActions
