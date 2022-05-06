import { NavLink } from "react-router-dom";


function PositiveButton(props) {

  const style = {
    background: '#5353f1',
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

export default PositiveButton