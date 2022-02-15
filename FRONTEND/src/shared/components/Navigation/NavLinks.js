import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";

import UserDropDown from "./UserDropDown";

import { AuthContext } from "../../context/auth-context";

import "./styling/NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <NavItem to="/" title={auth.isLoggedIn ? "DashBoard" : "Home"}></NavItem>

      {!auth.isLoggedIn && <NavItem to="/auth" title="Login"></NavItem>}
      {auth.isLoggedIn && <NavItem to="/todo" title="To Do"></NavItem>}
      {auth.isLoggedIn && <NavItem to="/finance" title="Finance"></NavItem>}
      {auth.isLoggedIn && (
        <NavItem
          className="Nav-Item__Button"
          icon={`${process.env.REACT_APP_ASSET_URL}/data/uploads/images/default.svg`}
        >
          {/*DropDown Goes HERE*/}
        </NavItem>
      )}
    </ul>
  );
};

export default NavLinks;
