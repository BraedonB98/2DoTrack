import React, { useState } from "react";

//-----------------------Components--------------------------
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AiFillSetting } from "react-icons/ai";
//---------------------CSS----------------------------------
import "./styling/DashBoardItem.css";

const DashBoardItem = (props) => {
  const itemSelectDropDown = (event) => {
    event.preventDefault();
    console.log(props.column);
    console.log(props.row);
  };

  let component;

  if (props.item) {
    component = (
      <div className="dashboard-item__header">
        <Button
          className="dashboard-item__toggle-button"
          onClick={itemSelectDropDown}
        >
          ▼
        </Button>
        <Button
          className="dashboard-item__config-button"
          onClick={itemSelectDropDown}
        >
          <AiFillSetting />
        </Button>
      </div>
    );
    //to do list category
    //to do list priority
  } else {
    component = (
      <div className="dashboard-item__content">
        <Button
          className="dashboard-item__select-button"
          onClick={itemSelectDropDown}
        >
          Select DashBoard Item
        </Button>
      </div>
    );
  }

  return <Card className="dashboard-item">{component}</Card>;
};

export default DashBoardItem;
