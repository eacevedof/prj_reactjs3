//App.js
import React, {useState, useEffect} from 'react';
import Pregunta from "./components/Pregunta"
import Formulario from "./components/Formulario"
import Listado from "./components/Listado"

function App() {
  //state
  const [presupuesto, guardarPresupuesto] = useState(0)
  const [preguntaPresup, guardarPreguntaPresup] = useState(true)
  const [gasto, guardarGasto] = useState({})
  const [gastos, guardarGastos] = useState([])

  useEffect(()=>{
    const listadoGastos = [...gastos,gasto]
    guardarGastos(listadoGastos)
  },[])//por esto se quedaba colgado, es necesario pasar un objeto inicial

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
                <Formulario
                  guardarGasto={guardarGasto}
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos}
                />
              </div>
            </div>
          )

        }
        </div>
      </header>
    </div>
  );
}

export default App;
