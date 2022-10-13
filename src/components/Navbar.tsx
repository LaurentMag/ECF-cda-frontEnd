import React from "react";
import {NavLink} from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className="navlink__logo">
        <figure>
          <img
            className="general_image"
            src={require("../assets/localib-logo-nobg.png")}
            alt=""
          />
        </figure>
      </NavLink>
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
