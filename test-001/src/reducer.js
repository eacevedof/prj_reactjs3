import { useReducer, useEffect } from "react"

const productini = {
  loading: true,
  error: "",
  product: {}
}

const fn_reducer = (state, action) => {
  switch(action.type) {
    case "FECTH_SUCCESS":
      return {
        error: "",
        loading: false,
        product: action.payload,
      }
    case "FECTH_ERROR":
      return {
        error: "bad request",
        loading: false,
        product: action.payload 
      }
    default:
      return state
  }
}

function Reducer(props) {
  const [state, dispatch] = useReducer(fn_reducer, productini)


  return (
    <>
      <h1>hola</h1>
      <div></div>  
    </>
  )
}

export default Reducer