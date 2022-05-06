function InputWithLabel(props) {

  const divStyle = {
    margin: "20px",
    display: 'flex'
  }

  const inputStyle = {
    margin: "0 10px"
  }
  return (
    <div style={divStyle}>
      <label>{props.label}</label>
      <input style={inputStyle} type={props.type} />
    </div>
  )
}

export default InputWithLabel