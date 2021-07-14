import {useState} from "react"
import Child from "./components/child"
console.log("app pre")

function App() {
  const [msgp, set_msgp] = useState("-")
  console.log("app in")
  return (
    <div>
      {console.log("app return")}
      <h2>Hola test</h2>
      <Child msg={msgp}/>
      <button type="button" onClick={()=>set_msgp("button clicked")}>Boton</button>
    </div>
  );
}

export default App;
