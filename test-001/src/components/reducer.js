import { useReducer, useEffect } from "react"

const stateproducts = {
  loading: true,
  error: "",
  products: []
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
  const [state, dispatch] = useReducer(fn_reducer, stateproducts)

  useEffect(() => {
    const url = "https://json.theframework.es/index.php?getfile=app_product.json"
    fetch(url)
      .then(response => {
        const data = response.json()
        console.log(data)
        return data
      })
      .then(data => dispatch({
        type: "FETCH_SUCCESS",
        payload: data
      }))
      .catch(error => dispatch({
        type: "FETCH_ERROR",
        payload: []
      }))

  },[])

  return (
    <>
      <ul>
      {stateproducts.loading ? 
        "Loading" 
        : 
        stateproducts.products.map(product => <li key={product.id}> {product.id} - {product.description} </li>)
      }
      </ul>
    </>
  )
}

export default Reducer