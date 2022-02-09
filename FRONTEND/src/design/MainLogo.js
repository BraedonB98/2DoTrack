import React from "react";

import "./MainLogo.css";
const MainLogo = (props) => {
  return (
    <img
      className={props.styling}
      src={`${process.env.REACT_APP_ASSET_URL}/data/frontendref/images/2DoTrackLogo.png`}
      alt="2 DO Finance"
    />
  );
};

export default MainLogo;
