import React from "react";
import ReactDOM from "react-dom";

import "./styling/Backdrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div
      className={` ${props.error ? "backdrop-error" : "backdrop"}`}
      onClick={props.onClick}
    ></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
