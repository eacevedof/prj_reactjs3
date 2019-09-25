# 5. PROYECTO Administrador de Pacientes con Class y Stateless Functional Components

## 1. Viendo el Proyecto de Este Capítulo
- ![formulario](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1182x671/2b1670c0f5a17382a86026287fc42381/image.png)
## 2. Creando la App y primeros pasos
- create-react-app pacientesveterinaria
- npm start
- [bootswatch.com](https://bootswatch.com)
    - clases de bootstrap con varios colores
- [gist con css](https://gist.github.com/juanpablogdl/40a1702e6663e9032930442c1a91c76e)
## 3. React Hooks, Redux, Context y Classes
- Hay varias formas de afrontar un problema en react
- usando:
  - Clases y Props 95% del cod existente de react usa esta forma
  - Context API (Disponible desde 16.3)
  - React Hooks (Disponible desde 16.8)
  - Redux (la forma más común de manejar un state complejo)
  - Se pueden utilizar con otras:
    - Clases y props con Redux
    - Hooks con Context
    - Hooks con Redux
## 4. Creando el Primer Componente
- Cambio el componente App de funcional a Clase
- Creo componente Header (stateless functional component)
```js
//App.js
class App extends Component {
  state = {  }
  
  render() { 
    return (  
      <div className="container">
        <Header titulo="Administrador Pacientes Veterinaria"/>
      </div>
    );
  }//render

}//class App 
 
//Header.js
//stateless functional component
const Header = ({titulo}) => (
  <header>
    <h1 className="text-center">{titulo}</h1>
  </header>
)
```
## 5. Creando el Formulario
- Componente NuevaCita
- Este componente es un formulario con campos y botón
```js
//App.js
  render() { 
    return (  
      <div className="container">
        <Header titulo="Administrador Pacientes Veterinaria"/>

        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita/>
          </div>
        </div>
        
      </div>
    );
  }//render
//NuevaCita.js
return (  
  <div className="card mt-5 py-5">
    <div className="card-body">
      <h2 className="card-title text-center mb-5">
        Llena el form para crear nueva cita
      </h2>
      <form>
        
        <div className="form-group row">
          <label className="col-sm-4 col-lg-2 col-form-label">Nombre mascota</label>
          <div className="col-sm-8 col-lg-10">
            <input 
              type="text"
              className="form-control"
              placeholder="Nombre mascota"
              name="mascota"
            />
          </div>
        </div>{/* form-group */}
```
## 6. Leyendo los datos del formulario
- Más adelante veremos **refs**
```js
//NuevaCita.js
class NuevaCita extends Component {
  state = {  
    cita: {
      mascota:"",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: "",
    }
  }
  
  handleChange = e =>{
    console.log(e.target.name+ ": "+e.target.value)
    // colocar lo que el usuario escribe en el state
    this.setState({
      cita:{
        ...this.state.cita, //hacemos copia del state para no perderlo
        [e.target.name] : e.target.value //rescribimos lo que esté cambiando
      }
    })
  }
  ...
  <input 
    type="text"
    className="form-control"
    placeholder="Nombre mascota"
    name="mascota"
    onChange={this.handleChange}
    value={this.state.cita.mascota}
  />  
```
## 7. Validando un Formulario con State
```js
//NuevaCita.js
state = {  
  cita: {
    mascota:"",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  },
  error: false
}
...
handleChange = e =>{
  console.log(e.target.name+ ": "+e.target.value)
  // colocar lo que el usuario escribe en el state
  this.setState({
    cita:{
      ...this.state.cita, //hacemos copia del state para no perderlo
      [e.target.name] : e.target.value //rescribimos lo que esté cambiando
    }
  })
}
```
## 8. Almacenando la nueva cita en el state
- Tenemos que pasar los datos del state de NuevaCita al de App
- Como pasamos un dato del hijo hacia el padre. Usando una función.
- Se instala uuid: `npm install uuidv4`
- Lo interesante aqui es la funcion **props.crearNuevaCita(nuevaCita)**
- permite pasar valores del hijo al padre
```js
//NuevaCita.js
class NuevaCita extends Component {
  ...
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

  }//handleSubmit

//App.js
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
              //atributo función tipo get. 
              //Es curioso this.crearNuevaCita tiene visibilidad sobre state.citas
              //cuando llega a NuevaCita.js mantiene esa visibilidad al presionar el boton
              //en el formulario este modifica el estado con handleSubmit que al final termina llamando
              //a this.props.crearNuevaCita(nuevaCita) que actualiza citas en App
              crearNuevaCita={this.crearNuevaCita}
            />
          </div>
        </div>

      </div>
    );
  }//render
```
## 9. Mostrando el mensaje de error
```js
//NuevaCita.js
  render() { 
    // extraemos el atributo error el objeto state
    const {error} = this.state
  ...
      <h2 className="card-title text-center mb-5">
        Llena el form para crear nueva cita
      </h2>
      {error ? <div className="alert alert-danger mt-2 mb-5 text-center"> Todos los campos son obligatorios</div> :null}
      <form
  ...
```
## 10. Reiniciando el Formulario al agregar la nueva cita
```js
//NuevaCita.js
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

  ...
  
    // al ser una clase usamos props
    this.props.crearNuevaCita(nuevaCita)

    // colocar el state inicial. Se resetea el formulario
    this.setState({
      ...stateInicial
    })

  }//handleSubmit
  ...  
```
## 11. Mostrando las Citas del State
```js
//App.js
import ListaCitas from "./components/ListaCitas"
...
<div className="mt-5 col-md10 mx-auto">
  <ListaCitas
    citas = {this.state.citas}
  />
</div>

//ListaCitas.js
import Cita from "./Cita"

const ListaCitas = ({citas}) => (
  <div className="card mt-2 py-5">
    <div className="card-body">
      <h2 className="card-title text-center">
        Administra las citas aqui
      </h2>
      <div className="lista-citas">
        {citas.map(cita => (
          <Cita 
            key={cita.id}
            cita={cita}
            />
        ))}
      </div>
    </div>
  </div>
)

//Cita.js
const Cita = ({cita}) => (  
  <div className="media mt-3">
    <div className="media-body">
      <h3 className="mt-0">{cita.mascota}</h3>
      <p className="card-text"><span>Nombre Dueño: </span>{cita.propietario}</p>
      <p className="card-text"><span>Fecha: </span>{cita.fecha}</p>
      <p className="card-text"><span>Hora: </span>{cita.hora}</p>
      <p className="card-text"><span>Sintomas: </span></p>
      <p>{cita.propietario}</p>
    </div>
  </div>
);
```
## 12. Eliminando una Cita del State
```js
//App.js
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
  <div className="mt-5 col-md10 mx-auto">
    <ListaCitas
      citas = {this.state.citas}
      eliminarCita = {this.eliminarCita}
    />

//ListaCitas.js
const ListaCitas = ({citas, eliminarCita}) => (
....
{citas.map(cita => (
  <Cita 
    key={cita.id}
    cita={cita}
    eliminarCita={eliminarCita}
    />
))}
...
//Cita.js
const Cita = ({cita, eliminarCita}) => (  
  <div className="media mt-3">
  ...
  <button
  className="btn btn-danger"
  //importante no se llama directamente onclic=eliminarcita(cita.id) pq se ejecutaría
  //hay que envolver la acción en una función anónima
  onClick={()=>eliminarCita(cita.id)}
  >Borrar</button>
```
## 13. Colocando las citas en el Storage
- 
```js
```
## 14. Documentando tus Apps de React con PropTypes
- 
```js
```
## 15. Mostrando un mensaje condicionalmente
- 
```js
```
## 16. Deployment del Proyecto
- 
```js
```
