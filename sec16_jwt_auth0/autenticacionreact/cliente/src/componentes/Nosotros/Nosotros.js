import React, { Component } from 'react';
import './Nosotros.css';

class Nosotros extends Component {
     state = {}
     render() { 
          return (
               <div className="contenedor-nosotros">
                    <div className="imagen">
                         <img src="/img/camisa_1.png" alt="imagen nosotros" />
                    </div>
                    <div className="contenido">
                         <h2>Sobre Nosotros</h2>
                         <p>Aenean auctor, augue id porta viverra, dui odio vehicula sem, eget imperdiet est tellus quis massa. Pellentesque tempor ac mauris id elementum. Donec luctus mauris at arcu semper, et luctus quam sagittis. Curabitur arcu lectus, porta et vulputate eget, ullamcorper non est. Praesent enim lectus, dictum ut scelerisque in, fringilla quis velit. Phasellus mattis ultricies sem, vitae egestas metus fermentum eget. Suspendisse pretium viverra magna, id tristique ipsum ornare ut.</p>
                    </div>
               </div>

           )
     }
}
 
export default Nosotros;