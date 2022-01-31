import React from "react";

import "./MainLogo.css";
const MainLogo = props => {
    const logo ="./2DoFinanceLogo.png";
    return (
        <img className = {props.styling} src={`http://localhost:5000/data/frontendref/images/2DoFinanceLogo.png`} alt ="2 DO Finance"/>
    )
}

export default MainLogo;