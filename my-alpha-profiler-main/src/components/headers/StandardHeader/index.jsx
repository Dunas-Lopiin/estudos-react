import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const StandardHeader = ({ children }) => {
  return (
    <header id="standard-header">
      <NavLink to="/">
        <p id="profiler-header">Profiler</p>
      </NavLink>
      {children}
    </header>
  );
};

export default StandardHeader;
