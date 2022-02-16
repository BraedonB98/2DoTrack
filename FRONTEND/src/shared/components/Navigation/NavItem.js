import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";

import "./styling/NavItem.css";

const NavItem = (props) => {
  const auth = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <li className={props.to ? "" : "Nav-Item"}>
      {props.to && <NavLink to={props.to}>{props.title}</NavLink>}
      {!props.to && (
        <React.Fragment>
          <div className="Nav-Item__Button" onClick={() => setOpen(!open)}>
            <img alt="User-Menu" src={props.icon} className="Nav-Item__image" />
          </div>
          {open && props.children}
        </React.Fragment>
      )}
    </li>
  );
};

export default NavItem;
