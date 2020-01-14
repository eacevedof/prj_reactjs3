//rdposts.js
import { handleActions } from "redux-actions"
import { action1, action2 } from  "../actions"


console.log("action1:",action1,"typeof:",typeof action1,"tostring:",action1.toString())

export default handleActions ({
    //action1.toString() devolveria "action1"
    [action1]: (state, objaction) => {
      return [1,2,3]
    },
  
    [action2]: (state, objaction)=>{
      return [4,5,6]
    }
  },[])//handleActions

