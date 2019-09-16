import React, {Fragment} from 'react';

function App() {

  const empleado = {
    nombre: "Juan Pablo",
    trabajo: "Desarrollador Web"
  }

  //antes del return es un buen lugar para introducir codigo js
  //{} las llaves indican a react q es codigo javascript
  return (
    <Fragment>
      <h1>{empleado.nombre}</h1>
      <p>{empleado.trabajo}</p>
      { 2+2 }
    </Fragment>
  );//return

}//App()

export default App;
