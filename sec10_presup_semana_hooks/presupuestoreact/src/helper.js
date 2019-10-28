//https://gist.github.com/juanpablogdl/7f2a486ee41f0c972ca990e4f654a08a
export const revisarPresupuesto = (presupuesto,restante) => {
    let clase;
    // Comprobar el 25% 
    if( (presupuesto / 4) > restante) {
         clase = 'alert alert-danger';
    } else if( (presupuesto / 2) > restante) {
        clase = 'alert alert-warning'
    } else {
        clase = 'alert alert alert-success';
    }
    return clase;
} 