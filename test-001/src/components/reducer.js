import { useReducer, useEffect } from "react"

const stateproducts = {
  loading: true,
  error: "",
  products: []
}

const ACTIONS = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR"
}

const fn_reducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.FETCH_SUCCESS:
      return {
        error: "",
        loading: false,
        products: action.payload,
      }
    case ACTIONS.FETCH_ERROR:
      return {
        error: "bad request",
        loading: false,
        products: action.payload 
      }
    default:
      return state
  }
}

function Reducer(props) {
  const [state, dispatch] = useReducer(fn_reducer, stateproducts)

  useEffect(() => {
    //dispatch({type: ""})
    
    const url = "https://json.theframework.es/index.php?getfile=app_product.json"
    fetch(url)
      .then(response => response.json())
      //.then(data => console.table(data))
      .then(data => dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        error: false,
        payload: data
      }))
      .catch(error => dispatch({
        type: ACTIONS.FETCH_ERROR
      }))

  },[])

  return (
    <>
      {state.error && <h1>Error</h1>}
      <ul>
      {state.loading ? 
        "Loading" 
        : 
        state.products.map(product => <li key={product.id}> {product.id} - {product.description} </li>)
      }
      </ul>
    </>
  )
}

export default Reducer