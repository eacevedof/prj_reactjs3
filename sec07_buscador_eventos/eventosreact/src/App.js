//App.js
import React, {Fragment} from 'react'
import Header from "./components/Header"
import Formulario from './components/Formulario'

import CategoriasProvider from "./context/CategoriasContext"

function App() {
  return (
    //categoriasprovider es un context.provider
    <CategoriasProvider>
      <Header/>
      <div className="uk-container">
        <Formulario/>
      </div>
    </CategoriasProvider>
  )
}
export default App;
