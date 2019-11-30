## 16. PROYECTO Autenticación en React con JWT, Auth0 y un Servidor Express (NodeJS)

## Nota
- > Es extraño pero este proyecto como tal no existe en la lista de proyectos
- > quizas se ha eliminado por algún motivo

## 1. ¿Qué es JWT o JSON Web Token
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/736x394/adc71c44aa326ed0f3580613445434cf/image.png)
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/741x408/a6755c32c4de83fca4e3b82d6bb92212/image.png)
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/914x449/bd1e0f99b6b8f24265fef8c94e41e293/image.png)
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/e9b09f45a54b97881fa47f6ec87f6d9f/image.png)
- ![](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/945a1237e7a6fd6e27c88d1b5927fca5/image.png)

## 2. Lo que vamos a Construir en este capitulo
- ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/825x797/fbe9ec07662461b95fa11823225c73f4/image.png) 

## 3. Utilizando como base el Proyecto Anterior
- replico proyecto existente
- explica como se trabjará con el cliente, servidor y dos terminales
## 4. Creando la Aplicación y la API en Auth0
- [manage.auth0.com](https://manage.auth0.com/dashboard/eu/ioedu/)
- Estructurando el proyecto
- Se recicla el proyecto de routing de las camisetas
```js
- cliente
  - App camisetas
- servidor
  - Express
```
## 5. Descargando el Código de Auth0
- configurar auth0.com
- crear un nuevo proyecto
- descargar el zip de react de auth0
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/898x295/561fb75a7ecedf927bcb407a87ae79ed/image.png)
- **nota** la app demo de auth0 ahora es distinta a la del video con lo cual el movimiento de ficheros entre esta y la que estamos creando no coincide

## 6. Modificando el Archivo de las Rutas
```js
//routes.js
import React from 'react';
import { Route, Router } from 'react-router-dom';

// Auth0
import Callback from './Callback/Callback';
import Auth from '../Auth/Auth';
import history from '../history';

// Componentes Propios
import Header from './Header/Header';
import Navegacion from './Navegacion/Navegacion';
import Productos from './Productos/Productos';
import Nosotros from './Nosotros/Nosotros';
import SingleProducto from './SingleProducto/SingleProducto';
import Contacto from './Contacto/Contacto';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div className="contenedor">
        <Header />

        <Navegacion auth={auth} />

        <Route exact path="/" render={(props) => (
//los props aqui son muy importantes para poder leer auth
//todas las secciones que deseamos que sean seguras hay que pasar los props y auth
          <Productos
            //que tipo de estructura es esta??
            auth={auth} {...props} 
          />
        )}/>

//esta sección no estaría segura
        <Route exact path="/nosotros" component={Nosotros} />

        <Route exact path="/contacto" render={ (props) => (
          <Contacto 
            auth={auth} {...props}
          />
        )}/>

//sección segura
        <Route exact path="/productos" render={ (props) => (
          <Productos
            auth={auth} {...props}
          />
        )}/>

        <Route exact path="/producto/:productoId" render={(props) => {
            let idProducto = props.location.pathname.replace('/producto/', '');
            return (
              <SingleProducto
                producto={this.state.productos[idProducto]}
                key={idProducto}
                auth={auth} {...props}
              />
            )
        }}/>

        <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
        }}/>
      </div>
    </Router>
  );
}
```
## 7. Instalando las Dependencias y Creando un Nuevo Método para Autenticación
- 
```js
```
## 8. Creando el Servidor de Express
- 
```js
```
## 9. Configurando el Servidor de Express
- 
```js
```
## 10. Creando una Respuesta en el Servidor y Asegurando el Endpoint
- 
```js
```
## 11. Trabajando con el Componente de Productos
- 
```js
```
## 12. Autenticando Usuarios
- 
```js
```
## 13. Consultando la API de nuestro Servidor
- 
```js
```
## 14. Estilos al Botón de Iniciar Sesión y pasando las propiedades a la Navegación
- 
```js
```
## 15. Mostrando un botón para Iniciar  Cerrar Sesión Condicionalmente
- 
```js
```
## 16. Protegiendo la sección de Contacto
- 
```js
```
## 17. Agregando la funcionalidad para Buscar Productos
- 
```js
```
