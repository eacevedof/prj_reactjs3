//App.js
import React, {useState} from 'react';
import Pregunta from "./components/Pregunta"
import Formulario from "./components/Formulario"

function App() {
  //state
  const [presupuesto, guardarPresupuesto] = useState(0)
  const [preguntaPresup, guardarPreguntaPresup] = useState(true)

  return (
    <div className="App">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
        {
          preguntaPresup  ?
          <Pregunta 
          guardarPresupuesto={guardarPresupuesto}
          guardarPreguntaPresup={guardarPreguntaPresup}
          />
          : (
            <div className="row">
              <div className="one-half column">
                <Formulario/>
              </div>
              <div className="one-half column"></div>
            </div>
          )

        }
        </div>
      </header>
    </div>
  );
}

export default App;
