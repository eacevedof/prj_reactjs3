import { useReducer, useEffect } from "react"
import "../css/reducer.css"

const URL_PRODUCTS = "https://json.theframework.es/index.php?getfile=app_productx.json"

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
    case ACTIONS.FETCH_ERROR:
      return {
        error: action.error,
        loading: action.loading,
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
        error: "",
        payload: data
      }))
      .catch(ex => dispatch({
        type: ACTIONS.FETCH_ERROR,
        error: ex.message,
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
            error: "",
            payload: data
          })

        }
        catch (ex) {
          console.log(ex.message)
          dispatch({
            error: ex.message,
            type: ACTIONS.FETCH_ERROR,
            payload: []
          })          
        }
        
      })()
  },[])

  return (
    <>
      <div className="center">
        <h2>Productos</h2>
        <span className="status">
        Estado: {
          state.error ? 
            <h1 className="badge bg-danger">{state.error}</h1> 
          : 
            <h1 className="badge bg-success">Ok</h1>
        }
        </span>
      </div>
      <div className="grid mt-3">
        <div className="center">
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

//https://youtu.be/o-nCM1857AQ  (useState vs useReducer)