console.log("child pre")

function Child(props) {
  console.log("child in")
  return (
    <>
      {console.log("child return")}
      <h3>im a child</h3>
    </>
  )
}

export default Child