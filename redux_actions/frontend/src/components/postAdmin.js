//postAdmin.js
import React, {Component} from "react";

function getAsyncBase64(file){
  return new Promise((fn_resolve,fn_reject) => {
    const reader = new FileReader()
    reader.onload = ()=> fn_resolve(reader.result)
    //reader.onerror = (error) => fn_reject(error) lo mismo
    reader.onerror = fn_reject
    reader.readAsDataURL(file)
  })
}


class PostAdmin extends Component {
  state = {}

  render(){

    const {fn_insertpost} = this.props

    return (
      <form
        // pasa a async ya que hay una función que devuelve una promesa
        onSubmit={ async (e) => {
          e.preventDefault()
          
          //debugger
          let strimage = ""
          if(this.imageRef.files.length>0){
            const objimg = this.imageRef.files[0]
            strimage = await getAsyncBase64(objimg)
            console.log("strimage:",strimage)
          }

          //Root.actions.ac_insertpost
          fn_insertpost({
            id: Date.now(),
            image: strimage,
            content: this.textRef.value,
          })

          this.imageRef.value = ""
          this.textRef.value = ""

        }}//onSubmit
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