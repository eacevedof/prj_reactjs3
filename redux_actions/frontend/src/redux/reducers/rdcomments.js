//reducer rdcomments.js
import { handleActions } from "redux-actions"


export default handleActions ({
  action1: (state, objaction) => {
    return [1,2,3]
  },

  action2: (state, objaction)=>{
    return [4,5,6]
  }
},[])//handleActions
