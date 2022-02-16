import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import "./styling/NavItem.css";

const NavItem = (props) => {
  return (
    <li className={props.to ? "" : "Nav-Item"}>
      {props.to && <NavLink to={props.to}>{props.title}</NavLink>}
      {!props.to && (
        <React.Fragment>
          <div
            className="Nav-Item__Button"
            onClick={(event) => props.onOpen(event)}
          >
            <img alt="User-Menu" src={props.icon} className="Nav-Item__image" />
          </div>
          {props.children}
        </React.Fragment>
      )}
    </li>
  );
};

export default NavItem;
