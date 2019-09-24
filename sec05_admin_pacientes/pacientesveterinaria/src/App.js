//App.js
import React, {Component} from 'react';
import "./bootstrap.min.css";
import Header from "./components/Header"
import NuevaCita from "./components/NuevaCita"

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

      </div>
    );
  }//render

}//class App 
 
export default App;