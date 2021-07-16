import { useReducer, useEffect } from "react"
import "../css/reducer.css"

const URL_PRODUCTS = "https://json.theframework.es/index.php?getfile=app_product.json"

const ACTIONS = {
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR"
}

const stateproducts = {
  loading: true,
  error: "",
  products: []
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


function Reducer() {
  const [state, dispatch] = useReducer(fn_reducer, stateproducts)

  useEffect(() => {  
    fetch(URL_PRODUCTS)
      .then(response => response.json())
      .then(data => dispatch({
        type: ACTIONS.FETCH_SUCCESS,
        error: false,
        payload: data
      }))
      .catch(error => dispatch({
        type: ACTIONS.FETCH_ERROR,
        error: true,
        payload: []
      }))
  }, [])

  useEffect(()=>{
    (async () => {
        try {
          const response = await fetch(URL_PRODUCTS)
          if( !response.ok ) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          dispatch({
            type: ACTIONS.FETCH_SUCCESS,
            error: false,
            payload: data
          })

        }
        catch (error) {
          console.log(error)
          dispatch({
            error: true,
            type: ACTIONS.FETCH_ERROR,
            payload: []
          })          
        }
        
      })()
  },[])

  return (
    <>
      <div className="grid">
        <div className="center">
            {state.error && <h1 className="badge bg-danger">Error</h1>}
            <ul className="list-group">
            {state.loading ? 
              "Loading" 
              : 
              state.products.map(product =>         
                <li key={product.id} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="ms-2 me-auto">
                  <div className="fw-bold">{product.name}</div>
                    {product.description}
                  </div>
                  <span className="badge bg-primary rounded-pill">{product.id}</span>
              </li>          
              )
            }
            </ul>
          </div>
      </div>
    </>
  )
}

export default Reducer