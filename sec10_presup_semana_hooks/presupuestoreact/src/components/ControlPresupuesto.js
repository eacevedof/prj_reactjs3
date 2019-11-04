//ControlPresupuesto.js
import React, {Fragment} from 'react';

const ControlPresupuesto = ({presupuesto, restante}) => (
  <Fragment>
    <div className="alert alert-primary">
      presupuesto: ${presupuesto}
    </div>
    <div className="">
      Restante : $ {restante}
    </div>
  </Fragment>
)
 
export default ControlPresupuesto;