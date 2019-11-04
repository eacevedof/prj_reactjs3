//App.js
import React, {useState, useEffect} from 'react';
import Pregunta from "./components/Pregunta"
import Formulario from "./components/Formulario"
import Listado from "./components/Listado"
import ControlPresupuesto from "./components/ControlPresupuesto"

function App() {
  //state
  const [presupuesto, guardarPresupuesto] = useState(0)
  const [restante, guardarRestante] = useState(0)
  const [preguntaPresup, guardarPreguntaPresup] = useState(true)
  const [crearGasto, guardarCrearGasto] = useState(false)
  const [gasto, guardarGasto] = useState({})
  const [gastos, guardarGastos] = useState([])

  //componentDidMount
  useEffect(()=>{
    if(crearGasto){
      const listadoGastos = [...gastos,gasto]
      guardarGastos(listadoGastos)

      // restar el presupuesto
      const presupuestoRestante = restante - gasto.cantidadGasto
      guardarRestante(presupuestoRestante)

      // una vez que se agrega, lo ponemos como false
      guardarCrearGasto(false)
    }
  },[crearGasto,gastos,gasto,restante])//por esto se quedaba colgado,
  // es necesario pasar un objeto inicial
  /*
  Line 30:5:  React Hook useEffect has missing dependencies: 'gasto', 'gastos'
  , and 'restante'. Either include them or remove the dependency array  
  react-hooks/exhaustive-deps
  */

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
            guardarRestante={guardarRestante}
          />
          : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos}
                />
                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  restante={restante}
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
