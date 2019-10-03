//App.js
import React, {Fragment} from 'react';
import Header from "./components/Header"
import CategoriasProvider from "./context/CategoriasContext"

function App() {
  return (
    <CategoriasProvider>
      <Header/>
    </CategoriasProvider>
  )
}
export default App;
