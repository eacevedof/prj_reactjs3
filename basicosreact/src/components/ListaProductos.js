//ListaProductos.js
import React, { Component, Fragment } from 'react'
import Producto from './Producto'

class ListaProductos extends Component {

	state = {
		productos: [],
	}

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

	render() { 
		//segundo
		console.log("render",5)
		//aplicando destructuring
		const {productos} = this.state
		//console.log(productos)
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

}//class ListaProductos
 
export default ListaProductos;