//App.js
import React, {useState} from 'react'

function App() {
  // useState retorna 2 funciones
  // el state actual = this.state
  // Función que actualiza el state this.setState()
  const [citas, guardarCitas] = useState([])

  console.log(citas)

  return (
    <h>hola</h>
  )
}

export default App;
