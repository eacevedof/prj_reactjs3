//Error.js
import React from 'react';

const Error = ({msg})=>{
  return (<p className="alert alert-danger p3 my-5 text-center text-uppercase font-weight-bold">{msg}</p>)
}

export default Error;