//root.js
import React, { Component } from 'react'
import { connect } from "react-redux"
import Layout from "./layout"
import PostAdmin from "./postAdmin"
import Post from "./post"
//import api from "../services/api"
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
    console.log("root.js Root.componentDidMount(): this.props",this.props)
    //gracias a mapdispatchtoprops
    const {ac_getposts, ac_getcomments} = this.props

    console.log("root.js Root.componentDidMount() calling async ac_getposts y ac_getcomments begin")
    ac_getposts([])
    ac_getcomments([])
    console.log("root.js Root.componentDidMount() calling async ac_getposts y ac_getcomments end")
    
  }//componentDidMount

  render(){
    //console.log("root.js Root.render.props",this.props)
    const {
      //esto lo proporciona mapstatetoprops y los reducers
      comments,
      posts,

      //y esto mapdispatchtoprops y las acciones
      //ac_getcomments,
      //ac_getposts,      
      ac_insertcomment,
      ac_insertpost,
    } = this.props

    console.log("root.js Root.render: this.props",this.props)
    return (
      <div>
        <Layout>
          <PostAdmin fn_insertpost={ac_insertpost} />
          {
            posts.map(post => ( 
              <Post 
                key={post.id}
                postid={post.id}
                author="Guest"
                content={post.content}
                imageUrl={post.image}
                comments={comments.filter(comment => comment.postid === post.id)}
                fn_insertcomment={ac_insertcomment}
              />
            ))
          }
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