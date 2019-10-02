//Formulario.js
import React, {Component} from 'react'
import PropTypes from "prop-types"

class Formulario extends Component {
  state = {  
    categoria: "general"
  }

  // componentDidMount(){
  //   this.setState({
  //     categoria: "general"
  //   })    
  // }

  cambiarCategoria = e =>{
    
    this.setState({
      categoria: e.target.value
    },()=>{
      //se llama el callback para que se refresque <ListaNoticias noticias={this.state.noticias} />
      //ya que get_noticias actualiza this.state.noticias
      //en app.js: <Formulario getNoticias={this.get_async_noticias}/>
      this.props.get_noticias(this.state.categoria)
    })

  }  

  render() { 
    return (  
      <div className="buscaodr row">
        <div className="col s12 m8 offset-m2">
          <form>
            <h2>Encuentra Noticias por categoria</h2>
            <div className="input-field col s12 m8 offset-m2">
              <select onChange={this.cambiarCategoria}>
                <option value="">general</option>
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
 
Formulario.propTypes = {
  get_noticias: PropTypes.func.isRequired
}
 
export default Formulario