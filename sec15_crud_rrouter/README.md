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

## 8. Consultando la API
- 
```js
```
## 9. Pasando los resultados a Productos
- 
```js
```
## 10. Mostrando los Productos
- 
```js
```
## 11. Creando un Formulario para Nuevos Productos
- 
```js
```
## 12. Validando el Formulario
- 
```js
```
## 13. Creando nuevos productos
- 
```js
```
## 14. Creando una alerta y redirección
- 
```js
```
## 15. Recargando la lista de productos
- 
```js
```
## 16. Pasando los datos del producto a editar
- 
```js
```
## 17. Ajustando el Formulario para editar productos
- 
```js
```
## 18. Mostrando los datos en el formulario
- 
```js
```
## 19. Enviando el Request para editar
- 
```js
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
