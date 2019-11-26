//EditarProducto.js
import React, {useState, useRef} from 'react';
import Error from "./Error"

import axios from "axios"
import Swal from "sweetalert2"
import {withRouter} from "react-router-dom"

function EditarProducto(props){
  
  //destructuring de props
  const {history, producto, setRecargar} = props

  const precioPlatilloRef = useRef("")
  const nombrePlatilloRef = useRef("")

  const [error,setError] = useState(false)
  const [errmsg,setErrmsg] = useState("")
  const [categoria,setCategoria] = useState("")

  const onsubmit_async = async e =>{
    e.preventDefault();

    //revisar si cambio la cat de lo contrario asignar el mismo valor
    let categoriaPlatillo = (categoria === "") ? producto.categoria : categoria;
    console.log("categoriaPlatillo:",categoriaPlatillo)

    //obtener los valores del formulario
    const editarPlatillo = {
      precioPlatillo : precioPlatilloRef.current.value,
      nombrePlatillo : nombrePlatilloRef.current.value,
      categoria: categoriaPlatillo
    }

    //enviar el request
    try {
      const url = `http://localhost:4000/restaurant/${producto.id}`
      const resultado = await axios.put(url, editarPlatillo)
      console.log("resultado modif:",resultado)
      if(resultado.status === 200){
        Swal.fire(
          "Producto Modificado",
          "El producto se modificó correctamente",
          "success"
        )
      }
    }
    catch(err){
      setError(true)
      Swal.fire({
        type: "error",
        title: "Error",
        text: err.toString(),
      })
    }

    //app.setRecargar
    setRecargar(true)
    history.push("/productos")
  }//onsubmit_async

  const getValorRadio = e => {
    setCategoria(e.target.value)
  }

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Editar Producto</h1>

      {
        error ? <Error msg={errmsg} /> : null
      }

      <form
          className="mt-5"
          onSubmit={onsubmit_async}
      >
        <div className="form-group">
          <label>Nombre Platillo</label>
          <input 
            type="text" 
            className="form-control" 
            name="nombre" 
            placeholder="Nombre Platillo"
            ref={nombrePlatilloRef}
            defaultValue={producto.nombrePlatillo}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input 
            type="number" 
            className="form-control" 
            name="precio"
            placeholder="Precio Platillo"
            ref={precioPlatilloRef}
            defaultValue={producto.precioPlatillo}
          />
        </div>

        <legend className="text-center">Categoría:</legend>
        <div className="text-center">
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="postre"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "postre")}
            />
            <label className="form-check-label">
              Postre
            </label>
          </div>
        
          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="bebida"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "bebida")}
            />
            <label className="form-check-label">
              Bebida
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="cortes"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "cortes")}
            />
            <label className="form-check-label">
              Cortes
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input 
              className="form-check-input" 
              type="radio" 
              name="categoria"
              value="ensalada"
              onChange={getValorRadio}
              defaultChecked={(producto.categoria === "ensalada")}
            />
            <label className="form-check-label">
                Ensalada
            </label>
          </div>
        </div>

        <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
      </form>
    </div>
  )  
}

//withRouter nos da acceso a history y permite hacer redireccion
export default withRouter(EditarProducto);