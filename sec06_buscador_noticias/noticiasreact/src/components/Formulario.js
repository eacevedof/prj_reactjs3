//Formulario.js
import React, {Component} from 'react'

class Formulario extends Component {
  state = {  }

  cambiarCategoria(){

  }
  render() { 
    return (  
      <div className="buscaodr row">
        <div className="col s12 m8 offset-2">
          <form>
            <h2>Encuentra Noticias por categoria</h2>
            <div className="input-field col s12 m8">
              <select onChange={this.cambiarCategoria}>
                <option value="general">General</option>
                <option value="business">business</option>
                <option value="entertainment">entertainment</option>
                <option value="health">health</option>
                <option value="science">science</option>
                <option value="sports">sports</option>
                <option value="technology">technology</option>
              </select>
            </div>
          </form>
        </div>
      </div>     
    )//return
  }//render
}//class Formulario
 
export default Formulario