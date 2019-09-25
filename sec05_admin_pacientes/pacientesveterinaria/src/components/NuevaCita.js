import React, { Component } from 'react'
import uuid from 'uuidv4'

const stateInicial = {
  cita: {
    mascota:"",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  },
  error: false
}

class NuevaCita extends Component {
  
  state = {  
    ...stateInicial
  }
  
  handleChange = e =>{
    //console.log(e.target.name+ ": "+e.target.value)
    // colocar lo que el usuario escribe en el state
    this.setState({
      cita:{
        ...this.state.cita, //hacemos copia del state para no perderlo
        [e.target.name] : e.target.value //rescribimos lo que esté cambiando
      }
    })
  }

  // cuando el usuario envia el formulario
  handleSubmit = e =>{
    e.preventDefault();

    //extraer los valores del state
    //destructoring
    const {mascota,propietario,fecha,hora,sintomas} = this.state.cita

    // validar que todos los campos esten llenos    
    if(mascota==="" || propietario==="" || fecha==="" || hora==="" || sintomas===""){
      this.setState({
        error: true
      })
      return
    }
    // generar objeto con datos
    const nuevaCita = {...this.state.cita}
    nuevaCita.id = uuid()

    // agregar la cita al state de App
    // al ser una clase usamos props
    this.props.crearNuevaCita(nuevaCita)

    // colocar el state inicial. Se resetea el formulario
    this.setState({
      ...stateInicial
    })

  }//handleSubmit

  render() { 
    // extraemos el atributo error el objeto state
    const {error} = this.state

    return (  
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">
            Llena el form para crear nueva cita
          </h2>
          {error ? <div className="alert alert-danger mt-2 mb-5 text-center"> Todos los campos son obligatorios</div> :null}
          <form
            onSubmit={this.handleSubmit}
          >
            
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Nombre mascota</label>
              <div className="col-sm-8 col-lg-10">
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Nombre mascota"
                  name="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>{/* form-group */}

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Nombre dueño</label>
              <div className="col-sm-8 col-lg-10">
                <input 
                  type="text"
                  className="form-control"
                  placeholder="Nombre dueño"
                  name="propietario"
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}                  
                />
              </div>
            </div>{/* form-group */}

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
              <div className="col-sm-8 col-lg-4">
                <input 
                  type="date"
                  className="form-control"
                  name="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}                  
                />
              </div>

              <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
              <div className="col-sm-8 col-lg-4">
                <input 
                  type="time"
                  className="form-control"
                  name="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}                  
                />
              </div>
            </div>{/* form-group */}

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Sintomas</label>
              <div className="col-sm-8 col-lg-10">
                <textarea 
                  className="form-control"
                  name="sintomas"
                  placeholder="describe los sintomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}                  
                ></textarea>
              </div>
            </div>{/* form-group */}

            <input type="submit" className="py-3 mt-2 btn btn-success btn-block"
              value="Agregar nueva cita"
            />

          </form>
        </div>
      </div>
    );
  }//render

}//class NuevaCita
 
export default NuevaCita;