import React, {Fragment} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Productos from './components/Productos'

function App() {

  const fecha = new Date().getFullYear();
  
  return (
    <Fragment>
      <Header titulo="tienda virtual" />
      <Productos/>
      <Footer fecha={fecha} />
    </Fragment>
  )//return

}//App()

export default App;
