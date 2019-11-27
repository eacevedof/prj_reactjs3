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
                  <Productos
                      auth={auth} {...props}
                  />
            ) } />

            <Route exact path="/nosotros" component={Nosotros} />

            <Route exact path="/contacto" render={ (props) => (
                <Contacto 
                    auth={auth} {...props}
                />
            ) } />

            <Route exact path="/productos" render={ (props) => (
                <Productos
                    auth={auth} {...props}
                />
            ) } />

            <Route exact path="/producto/:productoId" render={(props) => {
                let idProducto = props.location.pathname.replace('/producto/', '');
                return (
                    <SingleProducto
                          producto={this.state.productos[idProducto]}
                          key={idProducto}
                          auth={auth} {...props}
                    />
                )
         } } />

          <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
