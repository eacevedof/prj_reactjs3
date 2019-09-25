//App.js
import React, {Component} from 'react';
import "./bootstrap.min.css";
import Header from "./components/Header"
import NuevaCita from "./components/NuevaCita"
import ListaCitas from "./components/ListaCitas"

class App extends Component {
  state = {  
    citas: []
  }
  
  crearNuevaCita = cita => {
    //console.log("crearNuevaCita",datos)

    //se hace copia de citas y se hace push del nuevo
    const citas = [...this.state.citas, cita]

    // agregar el nuevo state
    this.setState({
      citas //como el state se llama citas y la variable tambien nos ahorramos citas= citas
    })

  }

  // elimina citas del state
  eliminarCita = id => {
    //hacer copia del state
    const citasActuales = [...this.state.citas]
    //utilizar filter para sacar el elemento id del arreglo
    const citas = citasActuales.filter(cita => cita.id !== id)
    //actualizar el state
    this.setState({
      citas
    })
  }

  render() { 
    return (  
      <div className="container">
        <Header titulo="Administrador Pacientes Veterinaria"/>

        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>
        </div>

        <div className="mt-5 col-md10 mx-auto">
          <ListaCitas
            citas = {this.state.citas}
            eliminarCita = {this.eliminarCita}
          />
        </div>
      </div>
    );
  }//render

}//class App 
 
export default App;