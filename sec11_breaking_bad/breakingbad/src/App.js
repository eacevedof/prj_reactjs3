//App.js
import React, {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  
  //obtener la frase de la api
  const [frase,obtenerFrase] = useState({})

  const get_async_data = async ()=>{
    const url = "https://breaking-bad-quotes.herokuapp.com/v1/quotes"
    const resultado = await axios(url)
    //console.log("resultado:",resultado.data[0])
    //agregar el resultado al state
    obtenerFrase(resultado.data[0])
  }

  //componentDidMount || componentDidUpdate

  //useEffect es un listener que ejecutará el callback con cada cambio que haya en al app
  //por este motivo con las llamadas a la api se quedaría en un bucle infinito pq a cada respuesta 
  //se vuelve a lanzar el callback. Por esto exite el segundo parámetro que es donde se le indica 
  //cuando tiene que cambiar, es decir, con los cambios que afecten a determinadas variables
  useEffect(
    () => {
      get_async_data()
    },[])

  console.log("frase",frase)
  return <p>{frase.quote}</p>
}

export default App;
