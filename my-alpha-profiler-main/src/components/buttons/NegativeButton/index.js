import { NavLink } from "react-router-dom";

function NegativeButton(props) {

  const style = {
    background: 'red',
    color: 'white',
    border: 'none',
    margin: '20px'
  }

  return (
    <NavLink to={props.path}>
      <button style={style}>
        {props.label}
      </button>
    </NavLink>
  )
}

export default NegativeButton
