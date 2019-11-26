## 15. PROYECTO CRUD con React Router, JSON Server y React Hooks

## 1. El Proyecto que construiremos
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/550c088c92022c9be7954643fe424f0a/image.png)

## 2. Creando la Aplicación y Primeros Pasos
- $ npm install --save axios
- $ npm install --save react-router-dom
- instalo journal de bootwatch

## 3. Creando las rutas y Componentes
- Las rutas "constantes" deben estar en lugares iniciales
- Las rutas con "variables" en posiciones finales
```js
//App.js
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Productos from "./components/Productos"
import EditarProducto from "./components/EditarProducto"
import AgregarProducto from "./components/AgregarProducto"
import Producto from "./components/Producto"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/productos/nuevo" component={AgregarProducto}/>
        <Route exact path="/productos" component={Productos}/>
        <Route exact path="/productos/editar/:id" component={EditarProducto}/>
        <Route exact path="/productos/:id" component={Producto}/>
      </Switch>
    </Router>
  )
}

export default App;
```
## 4. Creando el Header y Footer
- El contenido visible en todo el proyecto debe estar entre router y switch
```js
//App.js
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Header from "./components/Header"
import Productos from "./components/Productos"
import EditarProducto from "./components/EditarProducto"
import AgregarProducto from "./components/AgregarProducto"
import Producto from "./components/Producto"

function App() {
  return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos/nuevo" component={AgregarProducto}/>
          <Route exact path="/productos" component={Productos}/>
          <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          <Route exact path="/productos/:id" component={Producto}/>
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  )
}
```
## 5. Creando una barra de navegación
- Hay un problema con las rutas y **activeClassName** y es que si se parecen las rutas todas las coincidentes se marcan como activas, para esto habria que tener rutas distintas 
- Ejemplo: /productos y /productos/nuevo => /productos /nuevo-producto
```js
//Header.js
import React from 'react';
import {Link, NavLink} from "react-router-dom"

const Header = () => {
  return (  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink to="/productos" className="navbar-brand">
          React CRUD & Routing
        </NavLink>

        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink 
              to="/productos" 
              className="nav-link"
              activeClassName="active"
              >
              Productos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/productos/nuevo" 
              className="nav-link">
              Nuevo Producto
            </NavLink>
          </li>          
        </ul>
      </div>
    </nav>    
  )
}
 
export default Header;
```
## 6. Que es una REST API, Endpoints y Requests
- **API** Application Programming Interface
- **REST** Representational State Transfer
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1028x754/25aa3d83bd72e5123e93da8414d96124/image.png)
- Usaremos fetch y axios para consumir los endpoints
## 7. Creando una API con JSON Server
- **json-server** npm install -g json-server
- json-server ./db.json -p 4000
- http://localhost:4000/restaurant

## 8. Consultando la API
```js
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
```
## 9. Pasando los resultados a Productos
```js
//App.js
 return (
    <Router>
      <Header/>
      <main className="container mt-5">
        <Switch>
          <Route exact path="/productos"            
            render={
              ()=>(
                //la forma de pasar datos a un componente es usando render
                <Productos
                  productos={productos}
                />
              )
            }
          />
//Productos.js
import React, {Fragment} from 'react';
import ProductoLista from "./ProductoLista"

function Productos({productos}){
  return (
    <Fragment>
      <h1 className="text-center">Productos</h1>
      <ul className="list-group mt-5">
        {
          productos.map((producto) => (
            <ProductoLista 
              key={producto.id}
              producto={producto}
            />
          ))
        }
      </ul>
    </Fragment>
  )
}

export default Productos;
```
## 10. Mostrando los Productos
```js
//ProductoLista.js
import React from 'react';
import {Link} from "react-router-dom"

//siempre que viene props.producto se puede hacer esto
function ProductoLista({producto}){

  const eliminarProducto = id => {
    console.log("eliminando",id)
  }

  return (
    <li 
      className="list-group-item d-flex justify-content-between align-items-center"
      data-categoria={producto.categoria}
    >
      <p>
        {producto.nombrePlatillo}{' '}
        <span className="font-weight-bold">${producto.precioPlatillo}</span>
      </p>

      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >Editar</Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={()=>eliminarProducto(producto.id)}
        >
          Eliminar &times;
        </button>

      </div>
    </li>
  )
}
```
## 11. Creando un Formulario para Nuevos Productos
- [gist formulario](https://gist.github.com/juanpablogdl/a9f55e0f19821093df131f2fa453f184)
- Para capturar los valores del formulario se usa los setters en onchange
- Para capturar los valores de los radios se pasa una funcion decoradora (un wrapper) que llama al setter en onchange
```js
import React, {useState, useEffect} from 'react';

function AgregarProducto(){

  const [nombrePlatillo,setNombrePlatillo] = useState("")
  const [precioPlatillo,setPrecioPlatillo] = useState("")
  const [categoria,setCategoria] = useState("")

  const getValorRadio = e => {
    setCategoria(e.target.value)
  }

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

      <form
          className="mt-5"
      >
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input 
            type="text" 
            className="form-control" 
            name="nombre" 
            placeholder="Nombre Platillo"
            onChange={e => setNombrePlatillo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input 
            type="number" 
            className="form-control" 
            name="precio"
            placeholder="Precio Platillo"
            onChange={e => setPrecioPlatillo(e.target.value)}
          />
        </div>

        <legend className="text-center">Categoría:</legend>
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="postre"
              onChange={getValorRadio}
            />
            <label className="form-check-label">
                Postre
            </label>
          </div>
        
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="bebida"
              onChange={getValorRadio}
            />
            <label className="form-check-label">
                Bebida
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="cortes"
              onChange={getValorRadio}
            />
            <label className="form-check-label">
                Cortes
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="ensalada"
              onChange={getValorRadio}
            />
            <label className="form-check-label">
              Ensalada
            </label>
          </div>
        </div>

        <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
      </form>
    </div>
  )
}
export default AgregarProducto;
```
## 12. Validando el Formulario
```js
//AgregarProducto.js
...
  const on_submit = e=>{
    e.preventDefault()
    //en cada cambio de los inputs estos estados se han actualizado con sus setters en el onchange
    if(nombrePlatillo==="" || precioPlatillo==="" || categoria===""){
      setError(true) //el cambio en error hace que se muestre el comp <Error/>
      return 
    }

    setError(false); 
  }

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

      {
        error ? <Error msg="Todos los campos son obligatorios" /> : null
      }

      <form
          className="mt-5"
          onSubmit={on_submit}
      >
```
## 13. Creando nuevos productos
```js
//AgregarProducto.js
import React, {useState, useEffect} from 'react';
import Error from "./Error"
import axios from "axios"

function AgregarProducto(){

  const [nombrePlatillo,setNombrePlatillo] = useState("")
  const [precioPlatillo,setPrecioPlatillo] = useState("")
  const [categoria,setCategoria] = useState("")
  const [error,setError] = useState(false)
  const [errmsg,setErrmsg] = useState("")

  const getValorRadio = e => {
    setCategoria(e.target.value)
  }

  const onsubmit_async = async e=>{
    e.preventDefault()
    //en cada cambio de los inputs estos estados se han actualizado con sus setters en el onchange
    if(nombrePlatillo==="" || precioPlatillo==="" || categoria===""){
      setError(true) //el cambio en error hace que se muestre el comp <Error/>
      setErrmsg("Todos los campos son obligatorios")
      return 
    }

    setError(false); 
    try {
      const url = "http://localhost:4000/restaurant"
      const resultado = await axios.post(url,{
        nombrePlatillo,
        precioPlatillo,
        categoria
      })
      console.log("onsubmit_async result",resultado)
    }
    catch(err){
      setError(true)
      console.log("onsubmit_async err",err,typeof err)
      setErrmsg(err.toString())
    }
  }//onsubmit_async

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

      {
        error ? <Error msg={errmsg} /> : null
      }

      <form
          className="mt-5"
          onSubmit={onsubmit_async}
      >
```
## 14. Creando una alerta y redirección
- Instalación de sweetalert
- npm install sweetalert2
- Redireccion con: history.push("/productos")

```js
//AgregarProducto.js
import Swal from "sweetalert2"
//high order component
//gracias a este componente podremos tener acceso al history
import {withRouter} from "react-router-dom"
...
function AgregarProducto({history}){
  ...
  const onsubmit_async = async e=>{
    e.preventDefault()
    //en cada cambio de los inputs estos estados se han actualizado con sus setters en el onchange
    if(nombrePlatillo==="" || precioPlatillo==="" || categoria===""){
      setError(true) //el cambio en error hace que se muestre el comp <Error/>
      setErrmsg("Todos los campos son obligatorios")
      return 
    }

    setError(false); 
    try {
      const url = "http://localhost:4000/restaurant"
      const resultado = await axios.post(url,{
        nombrePlatillo,
        precioPlatillo,
        categoria
      })
      if(resultado.status === 201){
        Swal.fire(
          "Producto Creado",
          "El producto se creó correctamente",
          "success"
        )
      }
    }
    catch(err){
      setError(true)
      //setErrmsg(err.toString())
      Swal.fire({
        type: "error",
        title: "Error",
        text: err.toString(),
      })
    }

    //redirigir al usuario a productolista
    history.push("/productos")

  }//onsubmit_async
...
//wrapper que permite interactuar con el historial
export default withRouter(AgregarProducto);
```
## 15. Recargando la lista de productos
- cmd+shift+r limpia cache de todos los componentes
```js
//App.js
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
          <Route exact path="/productos" component={Productos}/>
          <Route exact path="/productos/editar/:id" component={EditarProducto}/>
          <Route exact path="/productos/:id" component={Producto}/>
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  )
}

//AgregarProducto.js
//se inyecta app.setRecargar
function AgregarProducto({history,setRecargar}){

  const [nombrePlatillo,setNombrePlatillo] = useState("")
  const [precioPlatillo,setPrecioPlatillo] = useState("")

  const onsubmit_async = async e=>{
    e.preventDefault()
    //en cada cambio de los inputs estos estados se han actualizado con sus setters en el onchange
    if(nombrePlatillo==="" || precioPlatillo==="" || categoria===""){
      setError(true) //el cambio en error hace que se muestre el comp <Error/>
      setErrmsg("Todos los campos son obligatorios")
      return 
    }

    setError(false); 
    try {
      const url = "http://localhost:4000/restaurant"
      const resultado = await axios.post(url,{
        nombrePlatillo,
        precioPlatillo,
        categoria
      })
      if(resultado.status === 201){
        Swal.fire(
          "Producto Creado",
          "El producto se creó correctamente",
          "success"
        )
      }
    }
    catch(err){
      setError(true)
      //setErrmsg(err.toString())
      Swal.fire({
        type: "error",
        title: "Error",
        text: err.toString(),
      })
    }

    setRecargar(true)
    //redirigir al usuario a productolista
    history.push("/productos")

  }//onsubmit_async  
```
## 16. Pasando los datos del producto a editar
```js
//App.js
  <Route exact path="/productos" component={Productos}/>
  <Route exact path="/productos/editar/:id" 
      render={
        //con props podremos acceder al id pasado en la url. props.match.params.id
        props =>{
          console.log("productos:",productos)
          console.log("props.match.params.id:",props.match.params.id)
          const idproducto = props.match.params.id
          const objproducto = productos.filter(objprod => objprod.id.toString()===idproducto)[0]
          console.log("objprod:",objproducto)

          return (
            <EditarProducto 
              producto={objproducto}
            />
          )
        }
      }          
  />
  <Route exact path="/productos/:id" component={Producto}/>
```
## 17. Ajustando el Formulario para editar productos
- Casi se duplica lo que hay en agregar producto
- EditarProducto es un formulario igual que AgregarProducto
- Se usara refs para mostrar los valores
## 18. Mostrando los datos en el formulario
- json-server ./db.json -p 4000
- http://localhost:4000/restaurant
- Al editar un registro se usan los refs **useRef from 'react'**
- defaultValue
- defaultChecked
- useRef
```js
//App.js
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
            />
          )
        }
      }          
  />
//EditarProducto.js
import React, {useState, useRef} from 'react';
import Error from "./Error"

function EditarProducto({producto}){
  
  const precioPlatilloRef = useRef("")
  const nombrePlatilloRef = useRef("")

  const [error,setError] = useState(false)
  const [errmsg,setErrmsg] = useState("")
  const [categoria,setCategoria] = useState("")

  const getValorRadio = e => {
    setCategoria(e.target.value)
  }

  const onsubmit_async = async ()=>{ }

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Editar Producto</h1>

      {
        error ? <Error msg={errmsg} /> : null
      }

      <form
          className="mt-5"
          onSubmit={onsubmit_async}
      >
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input 
            type="text" 
            className="form-control" 
            name="nombre" 
            placeholder="Nombre Platillo"
            ref={precioPlatilloRef}
            defaultValue={producto.nombrePlatillo}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input 
            type="number" 
            className="form-control" 
            name="precio"
            placeholder="Precio Platillo"
            ref={precioPlatilloRef}
            defaultValue={producto.precioPlatillo}
          />
        </div>

        <legend className="text-center">Categoría:</legend>
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="postre"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "postre")}
            />
            <label className="form-check-label">
                Postre
            </label>
          </div>
        
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="bebida"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "bebida")}
            />
            <label className="form-check-label">
                Bebida
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="cortes"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "cortes")}
            />
            <label className="form-check-label">
                Cortes
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="ensalada"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "ensalada")}
            />
            <label className="form-check-label">
                Ensalada
            </label>
          </div>
        </div>

        <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
      </form>
    </div>
  )  
}
```
## 19. Enviando el Request para editar
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/cc4be06093b051ccff32246a9469a472/image.png)
  - Si nos fijamos EditarProducto tiene 2 ref y 3 states, los states apuntan a:
  - categoria, error y errmsg
```js
//EditarProducto.js
const onsubmit_async = async e =>{
  e.preventDefault();

  //revisar si cambio la cat de lo contrario asignar el mismo valor
  let categoriaPlatillo = (categoria === "") ? producto.categoria : categoria;
  console.log("categoriaPlatillo:",categoriaPlatillo)

  //obtener los valores del formulario
  const editarPlatillo = {
    precioPlatillo : precioPlatilloRef.current.value,
    nombrePlatillo : nombrePlatilloRef.current.value,
    categoria: categoriaPlatillo
  }

  console.log("editarPlatillo",editarPlatillo)
}

const getValorRadio = e => {
  setCategoria(e.target.value)
}
```
## 20. Creando una alerta y refrescando la lista de productos
- 
```js
```
## 21. Validando el Formulario
- 
```js
```
## 22. Eliminando un Producto
- 
```js
```
