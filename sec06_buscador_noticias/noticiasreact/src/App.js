//App.js
import React, {Component,Fragment} from 'react'
import Header from "./components/Header"
import ListaNoticias from "./components/ListaNoticias"
import Formulario from "./components/Formulario"

class App extends Component {
  
  state = {  
    noticias: []
  }

  //documento está listo, aqui se tiene que hacer la llamada
  componentDidMount(){
    this.get_async_noticias()
  }//componentDidMount

  get_async_noticias = async (categoria="general") => {
    const apikey = "d83a1ac3fa404f67bae0d83a4334698a";
    //https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=d83a1ac3fa404f67bae0d83a4334698a    
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${apikey}`
    console.log("get_async_noticias.url",url)
    const respuesta = await fetch(url)
    const noticias = await respuesta.json()
    console.log("get_async_noticias.noticias.articles",noticias.articles)
    this.setState({
      noticias: noticias.articles
    })
  }//get_async_noticias


  render() { 
    return ( 
      <Fragment>
        <Header 
          titulo = "Noticias React API"
        />
        <div className="container white contenedor-noticias">
          
          <Formulario get_noticias={this.get_async_noticias}/>
          
          <ListaNoticias
            noticias={this.state.noticias}
            //noticias = {["a1","b2","c3"]}
          />

        </div>
      </Fragment>
    )
  }//render

}//class App
 
export default App
