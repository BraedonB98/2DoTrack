import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./styling/NavItem.css";

const NavItem = (props) => {
  const auth = useContext(AuthContext);

  return (
    <li className={props.to ? "" : "Nav-Item"}>
      {props.to && <NavLink to={props.to}>{props.title}</NavLink>}
      {!props.to && (
        <a href="/#" className="Nav-Item__Button">
          <img alt="User-Menu" src={props.icon} className="Nav-Item__image" />
        </a>
      )}
    </li>
  );
};

export default NavItem;
