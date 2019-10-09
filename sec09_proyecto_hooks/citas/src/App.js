//App.js
import React, {useState, Fragment} from 'react'

function Formulario({crearCita}){

  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  })

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    })
  }

  console.log("Formulario.cita",cita)

  const enviarCita = e => {
    e.preventDefault()
    console.log("Formulario.enviarcita.cita",cita)
    // pasar la cita hacia el componente principal
    crearCita(cita)
    // reiniciar el state (reiniciar el form)
  }

  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form
        onSubmit={enviarCita}
      >
        <label>Nombre Mascota</label>
        <input 
          type="text" 
          name="mascota"
          className="u-full-width" 
          placeholder="Nombre Mascota" 
          onChange={actualizarState}
        />

        <label>Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota" 
          onChange={actualizarState}
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora" 
          onChange={actualizarState}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
        ></textarea>
        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
    </Fragment>    
  )

}//Formulario


function App() {
  // useState retorna 2 funciones
  // el state actual = this.state
  // Función que actualiza el state this.setState()
  const [citas, guardarCitas] = useState([])

  console.log("App.citas",citas)

  const crearCita = cita => {
    // tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, cita]
    console.log("crearcita.nuevascitas",nuevasCitas)
    guardarCitas(nuevasCitas)
  }

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>  
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
          </div>          
        </div>
      </div>
    </Fragment>
  )
}

export default App;
