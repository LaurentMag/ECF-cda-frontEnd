import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/vehicules"> Nos Vehicules</NavLink>
        </li>
        <li>
          <NavLink to="/clients"> Nos Clients</NavLink>
        </li>
      </ul>
    </nav>
  );
};
