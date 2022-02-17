import React from "react";

import "./styling/Card.css";

const Card = (props) => {
  return (
    <div
      className={`card ${props.className}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
