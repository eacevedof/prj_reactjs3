# 4. Introducción y Básicos de React

## 1. Estructura Básica de un Proyecto con create-react-app
- public
    - Archivos estáticos, imágenes
- src
    - componentes
- Limpieza de código y ficheros iniciales demo

## 2. React sin JSX
- Se puede crear codigo en React sin jsx, con js nativo
- No es recomendable
- El problema con `React.createElement` es que tendriamos que anidar contenido
```js
//App.js
function App() {
  return (
    React.createElement(
      "div",
      null,
      React.createElement(
        "input",
        {type: "text", value: "Nombre de Usuario"}
      )
    )
  );
}

export default App;
```
## 3. React con JSX
```js
//App.js
import React, {Fragment} from 'react';

function App() {
  const empleado = {
    nombre: "Juan Pablo",
    trabajo: "Desarrollador Web"
  }
  //antes del return es un buen lugar para introducir codigo js
  //{} las llaves indican a react q es codigo javascript
  return (
    //fragment evita tener que usar de wrapper un div por ejemplo
    <Fragment>
      <h1>{empleado.nombre}</h1>
      <p>{empleado.trabajo}</p>
      { 2+2 }
    </Fragment>
  );//return
}//App()
```
## 4. Que son los Componentes en React
- Te van a permitir separar el código
- Te permiten reutilizarlos
- Son como funciones js
- Puedes pasar datos de un comp a otro con **props**
- En react los datos fluyen de comp Padre a Hijo, no al reves.
- Dos tipos: **class component** y **functional component**
  - ![class vs function](https://trello-attachments.s3.amazonaws.com/5b014dcaf4507eacfc1b4540/5d7fef6652faf333827e91c3/02a51b9bbf012a1f2244e03d327c9b87/image.png)
- El único método obligatorio de class component es **render**
```js
//PrimerComponente.js
import React, {Component} from 'react';

class PrimerComponente extends Component {
    render() { 
        return ( <h1>Hola Mundo en PrimerComponente</h1> );
    }
}
//App.js
import PrimerComponente from "./components/PrimerComponente";
function App() {
  return (
    <Fragment>
      <PrimerComponente/>
      <PrimerComponente/>
      <PrimerComponente/>
    </Fragment>
  );//return
}//App()
```
## 5. Creando un Componente Funcional
- Se puede convertir a un **stateless functional component** un componente si:
  - no tiene ciclo de vida
  - no tiene **refs**
  - no tiene **state**
- **vscode:** `sfc` 
```js
//PrimerComponente.js

//componente funcional con
//sintaxis de function expression
const PrimerComponente = () =>  ( <h1>Hola Mundo en PrimerComponente B</h1> );

//en react se recomienda la sintaxis funcional para la definición del componente
//y la function expression para los métodos
function PrimerComponente(){
    return ( <h1>Hola Mundo en PrimerComponente C</h1> );
}

//PrimerComponente.js
import React from 'react';

const PrimerComponente = () =>  ( 
  <h1>Hola Mundo en PrimerComponente</h1> 
)

export default PrimerComponente;
```
## 6. Creando más Componentes
```js
//Header.js
const Header = (objprops) => (  
    <header>
        <h1>{objprops.titulo}</h1>
    </header>
);

//lo mismo que el anterior. Con destructuring
//extrayendo una propiedad en los parámetros
const Header = ({titulo}) => (  
	<header>
		<h1>{titulo}</h1>
	</header>
);
//Footer.js
import  React from 'react';

const Footer = ({fecha}) => (  
	<footer>
		<p>Todos los derechos reservados &copy;{fecha}</p>
	</footer>
);
 
export default Footer;
```

## 7. Introducción al State de React
- Crearemos un class component pq tendrá **state**
- **vscode:** 
  - imrc = `import React, { Component } from 'react';`
  - cc = `class | extends Componen`
```js
//Productos.js
//una forma de crear state (recomendada):
class Productos extends Component {
	state = {
		productos: [
			{ id:1, name: "Camisa ReactJS", precio: 30 },	
			{ id:2, name: "Camisa VueJs", precio: 30 },
			{ id:3, name: "Camisa Angular", precio: 30 },
			{ id:4, name: "Camisa Node.js", precio: 30 },
		]
	}
//otra forma 
  constructor(props){
    super(props)
    this.state = {
      productos: [
        { id:1, name: "Camisa ReactJS", precio: 30 },	
        { id:2, name: "Camisa VueJs", precio: 30 },
        { id:3, name: "Camisa Angular", precio: 30 },
        { id:4, name: "Camisa Node.js", precio: 30 },
      ]
    }
  }//constructor

//Productos.js final
class Productos extends Component {

	state = {
		productos: [
			{ id:1, name: "Camisa ReactJS", precio: 30 },	
			{ id:2, name: "Camisa VueJs", precio: 30 },
			{ id:3, name: "Camisa Angular", precio: 30 },
			{ id:4, name: "Camisa Node.js", precio: 30 },
		]
	}

	render() { 
		//aplicando destructuring
		const {productos} = this.state
		console.log(productos)
		return (  
			<h1>Lista de productos</h1>
		)
	}//render

}//class Productos
```
## 8. Iterando el State y llamando los Componentes
- ![producto en reacttools](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/626x229/4a3309cabf1bfea22f6dde8451370ea6/image.png)
```js
//ListaProductos.js
	render() { 
		//aplicando destructuring
		const {productos} = this.state
		console.log(productos)
		return (  
			<Fragment>
				<h1>Lista de productos</h1>
				{productos.map(producto =>(
					<Producto 
						key={producto.id} 
						producto={producto}
					/>
				))}
			</Fragment>
		)
	}//render
```
## 9. Mostrando el Contenido en el Componente
- Pinta los productos usando `Producto.js`
```js
//Producto.js
const Producto = ({producto}) => ( 
	<div>
  	<h1>{producto.nombre}</h1> 
		<p>Precio: {producto.precio}</p>
	</div>
);
```
## 10. Métodos de Ciclo de Vida del Componente
- Son métodos o funciones que se ejecutan automáticamente **en el** Componente
- No se les puede llamar, mejor dicho, no se les debe llamar ya que se gestionan automáticamente.
- Solo existen en **Class Components**
- Son eventos que ocurren dede que el componente es creado hasta que es destruido.
  - Algunos de los eventos:
  - componentdidmount (seria como el document.ready() de jquery)
  ```js
  class App extends Component {
    componentDidMount(){
      //aqui se hace la llamada a una API
      console.log("El documento está listo")
    }
    render(){
      return (
        <p>Hola Mundo</p>
      )
    }
  }
  ```
  - componentwillmount
  ```js
  class App extends Component {
    componentWillMount(){
      console.log("El componente no está listo, apenas se va a cargar")
    }
    render(){
      return (
        <p>Hola Mundo</p>
      )
    }
  }
  ```
  - componentdidupdate
  ```js
  class App extends Component {
    componentDidUpdate(){
      console.log("Algo cambió en el componente")
    }
    render(){
      return (
        <p>Hola Mundo</p>
      )
    }
  }
  ```
  - componentwillunmount
  ```js
  class App extends Component {
    componentWillUnmount(){
      console.log(`Un nuevo componente ha sido cargado y este 
      será reemplazado, pero puedes ejecutar algo antes de que eso pase`)
    }
    render(){
      return (
        <p>Hola Mundo</p>
      )
    }
  }
  ```  
  - Hay muchos otros que verémos en los próximos proyectos
```js
//ListaProductos.js
	componentDidMount(){
		//tercero
		console.log("componentDidMount",1)
		this.setState({
			productos: [
				{ id:1, nombre: "Camisa ReactJS", precio: 30 },	
				{ id:2, nombre: "Camisa VueJs",   precio: 30 },
				{ id:3, nombre: "Camisa Angular", precio: 30 },
				{ id:4, nombre: "Camisa Node.js", precio: 30 },
			]
		})
	}

	UNSAFE_componentWillMount(){
		console.log("UNSAFE_componentWillMount",2) //primero
	}

	UNSAFE_componentWillUpdate (){
		console.log("UNSAFE_componentWillUpdate",3) //cuarto si se modifica el estado
	}

	componentWillUnmount(){
		console.log("componentWillUnmount",4)//no se ejcutara hasta que reemplace este comp
	}
```
