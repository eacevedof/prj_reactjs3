//rdposts.js
import { handleActions } from "redux-actions"
import { ACTION_1, ACTION_2 } from  "../actions"


export default handleActions ({
    [ACTION_1]: (state, objaction) => {
      return [1,2,3]
    },
  
    [ACTION_2]: (state, objaction)=>{
      return [4,5,6]
    }
  },[])//handleActions

