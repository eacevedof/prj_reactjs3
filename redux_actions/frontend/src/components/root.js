//root.js
import React, { Component } from 'react'
import { connect } from "react-redux"
import { action1, ac_getcomments } from "../redux/actions"
import Layout from "./layout"
import PostAdmin from "./postAdmin"
import Post from "./post"
import api from "../services/api"
import {
  ac_getposts as acgetposts,
  ac_insertpost as acinsertpost,
  ac_getcomments as acgetcomments,
  ac_insertcomment as acinsertcomment,
} from "../redux/actions"


class Root extends Component {
  state = {}

  //como document.ready
  componentDidMount(){
    console.log("componentDidMount(): this.props",this.props)
    //this.props.action1(777)
    //api.comments.create({author: "eaf", content:"x y z"})
    //gracias a mapdispatchtoprops
    const {ac_getposts, ac_getcomments} = this.props

    //fuerzo carga inicial para demo llamando a las acciones
    ac_getposts([
      {
        "id":123,
        "content": "hola"
      }
    ])

    ac_getcomments([
      {
        "id": 1,
        "postid": 123,
        "author": "leo",
        "content": "que tal"
      }
    ])

  }//componentDidMount

  render(){
    console.log("render(): this.props",this.props)
    const {
      //esto lo proporciona mapstatetoprops y los reducers
      comments,
      posts,

      //y esto mapdispatchtoprops y las acciones
      //ac_getcomments,
      //ac_getposts,      
      //ac_insertcomment,
      //ac_insertpost,
    } = this.props

    return (
      <div>
        <Layout>
          <PostAdmin />
          {posts.map(post => (
            <Post 
              key={post.id}
              content={post.content}
              imageUrl={post.image}
              comments={comments.filter(comment => comment.postid === post.id)}
            />
          ))}
        </Layout>
      </div>
    )//return

  }//Render

}//class Root

const mapStateToProps = (state) => {
  //queremos tener acceso (al estado) a los comentarios y a post
  return {
    //fnstore devuelve la funcion agrupada de reducers 
    //con esta definición hacemos posible que Root pueda acceder al estado
    comments: state.fn_rdcomments,
    posts: state.fn_rdposts,
  }
}

//te publica en props las acciones y que estas a su vez te permiten interactuar 
//con el estado
const mapDispatchToProps = {
  ac_getposts: acgetposts,
  ac_getcomments: acgetcomments,
  ac_insertpost: acinsertpost,
  ac_insertcomment: acinsertcomment
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);