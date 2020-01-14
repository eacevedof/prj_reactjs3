//actions.js
//se definen acciones que son "action creators"
//sin redux-actions:

export const ACTION_1 = "action1"
export const ACTION_2 = "action2"

function action1(){
  return {
    type:     ACTION_1, //endpoint
    payload:  ["p1","p2","p3"], //nuevo estado
  }
}//action1

function action2(){
  return {
    type:     ACTION_2, //endpoint
    payload:  ["p1","p2","p3"], //nuevo estado
  }
}//action2