function UserInput(props) {

  const style = {
    margin: "10px"
  }

  return (
    <div style={style}>
      <input type={props.type} placeholder={props.placeholder} />
    </div>
  )
}

export default UserInput