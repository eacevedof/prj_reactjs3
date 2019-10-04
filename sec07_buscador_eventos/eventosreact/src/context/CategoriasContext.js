//CategoriasContext.js
import React, { Component } from 'react'
import axios from "axios"

const oContext = React.createContext()
export const CategoriasConsumer = oContext.Consumer

class CategoriasProvider extends Component {

  token = "CFUVFRX4ZD43ZDFWVQKO"

  state = {  
    categorias : []
  }

  componentDidMount(){
    this.get_async_categories()
  }

  get_async_categories = async ()=>{
    let url = `https://www.eventbriteapi.com/v3/categories/?token=${this.token}&locale=es_ES`
    let categorias = await axios.get(url)
    console.log(categorias.data.categories)
    this.setState({
      categorias: categorias.data.categories
    })
  }

  render() { 
    return (  
      <oContext.Provider
        value={{
          categorias: this.state.categorias 
        }}
      >
        {this.props.children}
      </oContext.Provider>
    )
  }

}//class CategoriasProvider

export default CategoriasProvider;