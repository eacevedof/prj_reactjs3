//post.js
import React, { Component } from 'react';

class Post extends Component {
  state = {  }
  render() { 
    const {
      postid,
      author,
      content,
      imageUrl,
      comments,
      fn_insertcomment, //viene de Root.actions.ac_insertcomment
    } = this.props

    return ( 
      <div className="card mb-5">
        <div className="card-body card-body-border">
          <p className="card-text">{content}</p>
        </div>

        {imageUrl &&
          <div className="card-body card-body-border">
            <img className="card-img-top" src={imageUrl} height="250" alt="Card"  />
          </div>
        }

        {Boolean(comments.length) &&
          <div className="card-body p-2">
            {comments.map(comment => (
              <div
                key={comment.id}
                className="bg-light alert alert-secondary p-2 mb-1"
                role="alert"
              >
                <b>{comment.author}: </b>
                <span>{comment.content}</span>
              </div>
            ))}
          </div>
        }

        <div className="card-footer p-1">
          <input
            ref={ref=>this.commentTextRef = ref}
            type="text"
            className="form-control nooutline"
            placeholder="Escribe un comentario..."
            onKeyPress={(e)=>{
              if(e.key === "Enter"){
                //Root.actions.ac_insertcomment
                fn_insertcomment({
                  //el contenido que queremos crear en el comentario
                  postid: postid,
                  author: author,
                  content: this.commentTextRef.value
                })

                this.commentTextRef.value = ""
              }
            }}
          />
        </div>
      </div>
    )//return
  }//render
}//Post
 
export default Post