//ProductoLista.js
import React from 'react';
import {Link} from "react-router-dom"

import axios from "axios"
import Swal from "sweetalert2"

//siempre que viene props.producto se puede hacer esto
function ProductoLista({producto,setRecargar}){

  const eliminarProducto = id => {
    console.log("producto:",producto,"setrecargar",setRecargar)
    console.log("eliminando",id)
    Swal.fire({
      title: "Estas seguro?",
      text: "Esta operación no es reversible",
      type: "Warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar"
    }).then( async result => {

      if(result.value){
        //enviar el request
        try {
          const url = `http://localhost:4000/restaurant/${id}`
          const resultado = await axios.delete(url)
          console.log("resultado delete:",resultado)
          if(resultado.status === 200){
            //consultar la api
            setRecargar(true)

            Swal.fire(
              "Producto eliminado",
              "El producto se eliminó correctamente",
              "success"
            )
          }
        }
        catch(err){
          //setError(true)
          Swal.fire({
            type: "error",
            title: "Error",
            text: err.toString(),
          })
        }
      }
    })
  }

  return (
    <li 
      className="list-group-item d-flex justify-content-between align-items-center"
      data-categoria={producto.categoria}
    >
      <p>
        {producto.nombrePlatillo}{' '}
        <span className="font-weight-bold">${producto.precioPlatillo}</span>
      </p>

      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >Editar</Link>

        <button
          type="button"
          className="btn btn-danger"
          onClick={()=>eliminarProducto(producto.id)}
        >
          Eliminar &times;
        </button>

      </div>
    </li>
  )
}

export default ProductoLista;