//actions.js
import { createAction } from "redux-actions"

export const ac_insertpost = createAction("ac_insertpost")
export const ac_getposts = createAction("ac_getposts")

export const ac_insertcomment = createAction("ac_insertcomment")
export const ac_getcomments = createAction("ac_getcomments")
