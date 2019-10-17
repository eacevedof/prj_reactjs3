//App.js
import React, {useState, Fragment} from 'react'

function Cita({cita, index, eliminarCita}){
  //app.eliminarcita
  return(
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Sintomas: <span>{cita.sintomas}</span></p>
      <button type="button"
        onClick={()=>eliminarCita(index)}
        className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )
}

function Formulario({crearCita}){

  const stateInicial = {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""    
  }

  //cita = state actual
  // actualizarCita = fn para cambiar el state
  const [cita, actualizarCita] = useState(stateInicial)

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
    actualizarCita(stateInicial)
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
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input 
          type="text" 
          name="propietario"
          className="u-full-width"  
          placeholder="Nombre Dueño de la Mascota" 
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input 
          type="date" 
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={cita.fecha}
        />               

        <label>Hora</label>
        <input 
          type="time" 
          className="u-full-width"
          name="hora" 
          onChange={actualizarState}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea 
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={cita.sintomas}
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

  //agregar las nuevas citas al state
  const crearCita = cita => {
    // tomar una copia del state y agregar el nuevo cliente
    const nuevasCitas = [...citas, cita]
    console.log("crearcita.nuevascitas",nuevasCitas)
    guardarCitas(nuevasCitas)
    
  }

  // elimina las citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas]
    nuevasCitas.splice(index,1)
    guardarCitas(nuevasCitas)
  }

  // Cargar Condicionalmente un título
  const titulo = Object.keys(citas).length === 0 ? "No hay citas" : "Administrar Las Citas"

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>  
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita,index)=>(
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>          
        </div>
      </div>
    </Fragment>
  )
}

export default App;
