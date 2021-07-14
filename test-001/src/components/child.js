console.log("child pre")

function Child({msg}) {
  console.log("child in")
  return (
    <>
      {console.log("child return")}
      <h3>im a child</h3>
      <p>{msg}</p>
    </>
  )
}

export default Child