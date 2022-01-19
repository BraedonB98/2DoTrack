import React from "react";

import "./MainLogo.css";
const MainLogo = props => {
    const logo ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXlGmAvAggLWzHdcUAZx_rVB8Q1OGR_Nn4Q&usqp=CAU";
    return (
        <img className = {props.styling} src={logo} alt ="2 DO Finance"/>
    )
}

export default MainLogo;