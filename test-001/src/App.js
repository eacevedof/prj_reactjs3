import Child from "./components/child"
console.log("app pre")

function App() {
  console.log("app in")
  return (
    <div>
      {console.log("app return")}
      <h2>Hola test</h2>
      <Child />
    </div>
  );
}

export default App;
