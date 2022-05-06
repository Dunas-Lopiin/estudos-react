import { useNavigate } from "react-router-dom";
import "./style.css";

import { useContext } from "react";
import { AuthContext } from "../../../context/auth";

function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };
  return (
    <button id="logout-button" onClick={handleSubmit}>
      Logout
    </button>
  );
}

export default LogoutButton;
