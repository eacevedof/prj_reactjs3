//api.js
import axios from "axios"

const reqhelper = axios.create({
  baseURL: "http://localhost:4000"
})

const objroutes = {
  posts: {
    get: () => reqhelper({
      url: "posts",
      method: "get",
    }),

    create: data => reqhelper({
      url: "posts",
      method: "post",
      data,
    })

  },

  comments: {
    get: () => reqhelper({
      url: "comments",
      method: "get",
    }),

    create: data => reqhelper({
      url: "comments",
      method: "post",
      data,
    })  }
}//objroutes

export default objroutes