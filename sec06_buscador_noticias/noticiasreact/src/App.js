//App.js
import React, {Component,Fragment} from 'react'
import Header from "./components/Header"
import ListaNoticias from "./components/ListaNoticias"

class App extends Component {
  
  state = {  }

  //documento está listo, aqui se tiene que hacer la llamada
  componentDidMount(){
    this.get_async_noticias()
  }//componentDidMount

  get_async_noticias = async () => {
    const apikey = "d83a1ac3fa404f67bae0d83a4334698a";
    const url = `https://newsapi.org/v2/top-headlines?source=techcrunch&country=us&apiKey=${apikey}`
    console.log("componentDidMount.url",url)
    const respuesta = await fetch(url)
    const noticias = await respuesta.json()
    console.log("componentDidMount.noticias.articles",noticias.articles)
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
          <ListaNoticias
            noticias={this.state.noticias}
          />
        </div>
      </Fragment>
    )
  }//render

}//class App
 
export default App
