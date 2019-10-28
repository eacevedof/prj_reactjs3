//App.js
import React, {useState} from 'react';
import Pregunta from "./components/Pregunta"

function App() {
  //state
  const [presupuesto, guardarPresupuesto] = useState(0)

  return (
    <div className="App">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          <Pregunta 
            guardarPresupuesto={guardarPresupuesto}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
