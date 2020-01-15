//postAdmin.js
import React, {Component} from "react";

class PostAdmin extends Component {
  state = {}

  render(){
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          
        }}
      >
        <div className="card border-light mb-3">
          <div className="card-header">Crear Publicación</div>
          <div className="card-body">
            <textarea
              ref={ref => this.textRef = ref}
              className="form-control nooutline"
              placeholder="Que estas pensando"
            />
            <label
              className="btn btn-secondary m-0 ml-2 mr-2"
              htmlFor="photoFile"
            >
              Foto
            </label>
            <input
              ref={ref => this.imageRef = ref}
              type="file"
              className="form-control-file d-none"
              id="photoFile"
            />
            <button type="submit" className="btn btn-primary">Publicar</button>
          </div>
        </div>
      </form>
    )//return

  }//render

}//PostAdmin

export default PostAdmin