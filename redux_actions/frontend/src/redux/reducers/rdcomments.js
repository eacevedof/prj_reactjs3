//rdcomments.js
import { handleActions } from "redux-actions"
import { ac_insertcomment_ok, ac_getcomments_ok } from  "../actions"

export default handleActions ({
  [ac_insertcomment_ok] : (state, action) => {
    console.log("rdcomments.js handleActions.ac_insertcomment_ok.state",state)
    console.log("rdcomments.js handleActions.ac_insertcomment_ok.action",action)
    return [...state, action.payload]
  },

  [ac_getcomments_ok] : (state, action) => {
    console.log("rdcomments.js handleActions.ac_getcomments_ok.state",state)
    console.log("rdcomments.js handleActions.ac_getcomments_ok.action",action)
    return action.payload
  }
 },[])//handleActions
