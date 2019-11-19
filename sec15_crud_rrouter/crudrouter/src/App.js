//App.js
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import axios from "axios"

import Header from "./components/Header"
import Productos from "./components/Productos"
import EditarProducto from "./components/EditarProducto"
import AgregarProducto from "./components/AgregarProducto"
import Producto from "./components/Producto"


function App() {

  const [productos, setProductos] = useState([])

  useEffect(()=>{
    const consultarApi = async() => {
      const url = "http://localhost:4000/restaurant"
      const resultado = await axios.get(url)
      //console.log("consultarApi.resultado.data",resultado.data)
      setProductos(resultado.data)
    }

    consultarApi()
  },[])

  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos"            
            render={()=>(
              //la forma de pasar datos a un componente es usando render
              <Productos
                productos={productos}
              />
            )}
          />
          <Route exact path="/productos/nuevo" 
 
          />
          <Route exact path="/productos" component={Productos}/>
          <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          <Route exact path="/productos/:id" component={Producto}/>
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  )
}

export default App;
