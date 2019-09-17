import React, { Component, Fragment } from 'react'
import Producto from './Producto'

class ListaProductos extends Component {

	state = {
		productos: [
			{ id:1, name: "Camisa ReactJS", precio: 30 },	
			{ id:2, name: "Camisa VueJs", precio: 30 },
			{ id:3, name: "Camisa Angular", precio: 30 },
			{ id:4, name: "Camisa Node.js", precio: 30 },
		],
		totalCarrito: 500,
		cliente: 'Juan De la Torre',
	}

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

}//class ListaProductos
 
export default ListaProductos;