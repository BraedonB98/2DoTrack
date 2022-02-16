import React from "react";
import { AuthContext } from "../../context/auth-context";
import "./styling/DropDownMenu.css";

const DropDownMenu = (props) => {
  return <div className="drop-down-menu">{props.children}</div>;
};

//<DropDownItem leftIcon= {<CogIcon/>} rightIcon= {<CogIcon/>}>My Profile</DropDownItem>

export default DropDownMenu;
