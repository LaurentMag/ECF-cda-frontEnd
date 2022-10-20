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
          <NavLink
            to="/"
            className="text-link">
            Location
          </NavLink>
        </li>
        <li>
          <NavLink
            to="gestion"
            className="text-link">
            Gestion Locations
          </NavLink>
        </li>
        <li>
          <NavLink
            to="vehicules"
            className="text-link">
            Nos Vehicules
          </NavLink>
        </li>
        <li>
          <NavLink
            to="clients"
            className="text-link">
            Nos Clients
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
