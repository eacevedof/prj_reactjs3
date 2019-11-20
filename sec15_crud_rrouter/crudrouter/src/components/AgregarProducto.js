//AgregarProducto.js
import React, {useState, useEffect} from 'react';
import Error from "./Error"
import axios from "axios"

function AgregarProducto(){

  const [nombrePlatillo,setNombrePlatillo] = useState("")
  const [precioPlatillo,setPrecioPlatillo] = useState("")
  const [categoria,setCategoria] = useState("")
  const [error,setError] = useState(false)
  const [errmsg,setErrmsg] = useState("")

  const getValorRadio = e => {
    setCategoria(e.target.value)
  }

  const onsubmit_async = async e=>{
    e.preventDefault()
    //en cada cambio de los inputs estos estados se han actualizado con sus setters en el onchange
    if(nombrePlatillo==="" || precioPlatillo==="" || categoria===""){
      setError(true) //el cambio en error hace que se muestre el comp <Error/>
      setErrmsg("Todos los campos son obligatorios")
      return 
    }

    setError(false); 
    try {
      const url = "http://localhost:4000/restaurant"
      const resultado = await axios.post(url,{
        nombrePlatillo,
        precioPlatillo,
        categoria
      })
      console.log("onsubmit_async result",resultado)
    }
    catch(err){
      setError(true)
      console.log("onsubmit_async err",err,typeof err)
      setErrmsg(err.toString())
    }
  }//onsubmit_async

  return (
    <div className="col-md-8 mx-auto ">
      <h1 className="text-center">Agregar Nuevo Producto</h1>

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
            onChange={e => setNombrePlatillo(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Precio Platillo</label>
          <input 
            type="number" 
            className="form-control" 
            name="precio"
            placeholder="Precio Platillo"
            onChange={e => setPrecioPlatillo(e.target.value)}
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

        <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
      </form>
    </div>
  )
}

export default AgregarProducto;