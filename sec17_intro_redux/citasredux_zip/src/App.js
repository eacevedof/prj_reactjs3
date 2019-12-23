import React from 'react';
import AgregarCita from './componentes/AgregarCita';
import ListadoCitas from './componentes/ListadoCitas';

// Redux
import store from './store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="container">
          <header>
              <h1 className="text-center">Administrador de Pacientes de Veterinaria</h1>
          </header>

          <div className="row mt-3">
              <div className="col-md-6">
                  <AgregarCita />
              </div>
              <div className="col-md-6">
                  <ListadoCitas />
              </div>
          </div>
      </div>
    </Provider>
  );
}

export default App;
