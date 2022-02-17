import React, { useState } from "react";
import Icon from "../UIElements/Icons";
import Button from "./Button";

import "./styling/iconSelector.css";

const IconSelector = (props) => {
  const [searchedIcon, setSearchedIcon] = useState();

  const iconSearchHandler = (event) => {
    setSearchedIcon(event.target.value);
  };
  const iconClickHandler = (event) => {
    props.onSelectedIcon(event, event.currentTarget.dataset.index);
  };
  return (
    <React.Fragment>
      <div className={`icon-selector__menu ${props.className}`}>
        <input
          className="icon-selector__icon-search"
          id="name"
          element="input"
          type="text"
          label="SearchIcon"
          autoComplete="off"
          onChange={iconSearchHandler}
        />
        <Button
          danger
          className="icon-selector__cancelButton"
          onClick={props.onCancel}
        >
          x
        </Button>
        <div className="icon-selector__icon-menu">
          <Icon
            className="icon-selector__icons"
            onClick={iconClickHandler}
            search={searchedIcon}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default IconSelector;
