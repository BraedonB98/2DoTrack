import React from "react";

import "./MainLogo.css";
const MainLogo = props => {
    const logo ="./2DoFinanceLogo.png";
    return (
        <img className = {props.styling} src={logo} alt ="2 DO Finance"/>
    )
}

export default MainLogo;