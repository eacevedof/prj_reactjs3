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
  //variable y funcion que se usara para inyectarla en AgregarProducto
  //de modo que cuando ese form cree un nuevo prod setee este buleano a true
  //lo que hará que se desencadene la llamada ajax del listado
  const [recargar,setRecargar] = useState(true)

  useEffect(()=>{
    if(recargar){
      const consultarApi = async() => {
        const url = "http://localhost:4000/restaurant"
        const resultado = await axios.get(url)
        setProductos(resultado.data)
      } 
      consultarApi()
      // cambiar a false la recarga de los productos
      setRecargar(false)      
    }

  //recargar es la unica dependencia, unica variable de estado
  //que se toma en cuenta en useEffect
  },[recargar])

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
                setRecargar={setRecargar}
              />
            )}
          />
          <Route exact path="/productos/nuevo" 
            //component={AgregarProducto}
            render={
              () => (
                <AgregarProducto 
                  setRecargar={setRecargar}
                />
              )
            }
          />
          <Route exact path="/productos/editar/:id" 
              render={
                //con props podremos acceder al id pasado en la url. props.match.params.id
                props =>{
                  console.log("productos:",productos)
                  console.log("props.match.params.id",props.match.params.id)
                  const idproducto = props.match.params.id
                  const objproducto = productos.filter(objprod => objprod.id.toString()===idproducto)[0]
                  console.log("objprod:",objproducto)

                  return (
                    <EditarProducto 
                      producto={objproducto}
                      setRecargar={setRecargar}
                    />
                  )
                }
              }          
          />
          <Route exact path="/productos/:id" component={Producto}/>
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  )
}

export default App;
