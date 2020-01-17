//actions.js
import { createAction } from "redux-actions"
import api from "../services/api"

export const ac_getposts_ok = createAction("ac_getposts_ok")
export const ac_getposts_nok = createAction("ac_getposts_nok")
export const ac_getposts = () => async fn_dispatch => {
  try {
    const response = await api.posts.get()
    console.log("response.data",response.data)
    fn_dispatch( ac_getposts_ok(response.data) )
  
  }
  catch (err) {
    fn_dispatch(ac_getposts_nok(err))
  }
}// ac_getposts


export const ac_insertpost_ok = createAction("ac_insertpost_ok")
export const ac_insertpost = (data) => async fn_dispatch => {
  try {
    const response = await api.posts.create(data)
    console.log("response.data",response.data)
    fn_dispatch( ac_insertpost_ok(response.data) )
  
  }
  catch (err) {
    fn_dispatch(ac_getposts_nok(err))
  }
}// ac_insertpost


export const ac_getcomments_ok = createAction("ac_getcomments_ok")
export const ac_getcomments_nok = createAction("ac_getcomments_nok")
export const ac_getcomments = () => async fn_dispatch => {
  try {
    const response = await api.comments.get()
    console.log("response.data",response.data)
    fn_dispatch( ac_getcomments_ok(response.data) )
  }
  catch (err) {
    fn_dispatch(ac_getcomments_nok(err))
  }
}// ac_getcomments


export const ac_insertcomment_ok = createAction("ac_insertcomment_ok")
export const ac_insertcomment = (data) => async fn_dispatch => {
  try {
    const response = await api.comments.create(data)
    console.log("insertcomment response.data",response.data)
    fn_dispatch( ac_insertcomment_ok(response.data) )  
  }
  catch (err) {
    fn_dispatch(ac_getcomments_nok(err))
  }
}// ac_insertcomment
