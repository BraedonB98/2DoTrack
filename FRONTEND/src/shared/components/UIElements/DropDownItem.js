import React from "react";

import "./styling/DropDownMenu.css";
const DropDownItem = (props) => {
  return (
    <div className="drop-down-menu__item" onClick={props.onClick}>
      <span className="drop-down-menu__icon-left">{props.leftIcon}</span>
      {props.children}
      <span className="drop-down-menu__icon-right">{props.rightIcon}</span>
    </div>
  );
};

export default DropDownItem;
