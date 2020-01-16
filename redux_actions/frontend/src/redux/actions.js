//actions.js
import { createAction } from "redux-actions"

export const ac_insertpost = createAction("ac_insertpost")
export const ac_getposts = createAction("ac_getposts")

export const ac_insertcomment = createAction("ac_insertcomment")
export const ac_getcomments = createAction("ac_getcomments")

//estas acciones no son totalmente compatibles con redux-thunk
//se define middleware en fnstore.js

//como esta acción pasará por el middleware antes de llegar al reducer
//el middleware espera que retorne una función que puede ser asincrona

const todo = () => {
  return async (fn_dispatch) => {
    const d = await get_asyncdata()
    //una vez que se tiene los datos entonces se puede llamar a la accion
    fn_dispatch({
      type: "",
      payload: d
    })
  }
}
