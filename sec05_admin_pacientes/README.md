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
- 
```js
```
## 7. Validando un Formulario con State
- 
```js
```
## 8. Almacenando la nueva cita en el state
- 
```js
```
## 9. Mostrando el mensaje de error
- 
```js
```
## 10. Reiniciando el Formulario al agregar la nueva cita
- 
```js
```
## 11. Mostrando las Citas del State
- 
```js
```
## 12. Eliminando una Cita del State
- 
```js
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
