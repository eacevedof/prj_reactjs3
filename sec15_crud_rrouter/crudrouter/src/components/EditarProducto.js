//EditarProducto.js
import React, {useState} from 'react';
import Error from "./Error"

function EditarProducto(){
  
  const [error,setError] = useState(false)
  const [errmsg,setErrmsg] = useState("")
  const [categoria,setCategoria] = useState("")

  const getValorRadio = e => {
    setCategoria(e.target.value)
  }

  const onsubmit_async = async ()=>{

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
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input 
            type="number" 
            className="form-control" 
            name="precio"
            placeholder="Precio Platillo"
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

export default EditarProducto;