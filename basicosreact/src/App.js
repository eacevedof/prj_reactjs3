import React, {Fragment} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  const fecha = new Date().getFullYear();
  
  return (
    <Fragment>
      <Header titulo="tienda virtual" />
      <Footer fecha={fecha} />
    </Fragment>
  )//return

}//App()

export default App;
