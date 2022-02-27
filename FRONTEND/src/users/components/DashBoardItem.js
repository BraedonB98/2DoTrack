import React, { useState } from "react";

//-----------------------Components--------------------------
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { AiFillSetting } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import DashBoardItemSettingsTab from "./DashBoardItemSettingsTab";
//---------------------CSS----------------------------------
import "./styling/DashBoardItem.css";
import react from "react";

const DashBoardItem = (props) => {
  const [settingDropDown, setSettingDropDown] = useState(false);
  const itemSelectHandler = (event) => {
    event.preventDefault();
    console.log(props.column);
    console.log(props.row);
  };

  const itemSettingsHandler = (event) => {
    event.preventDefault();
    setSettingDropDown(!settingDropDown);
    console.log(props.column);
    console.log(props.row);
  };

  const deleteItemHandler = (event) => {
    event.preventDefault();
    props.onDelete(props.row, props.column);
  };

  let component;

  if (props.item) {
    component = (
      <div className="dashboard-item__header">
        {settingDropDown && <DashBoardItemSettingsTab />}
        <Button
          className="dashboard-item__settings-button"
          onClick={itemSettingsHandler}
        >
          <AiFillSetting />
        </Button>
        <Button
          className="dashboard-item__remove-button"
          onClick={deleteItemHandler}
        >
          <BsFillTrashFill />
        </Button>
      </div>
    );
    //to do list category
    //to do list priority
  } else {
    component = (
      <react.Fragment>
        <div className="dashboard-item__header">
          <Button
            className="dashboard-item__settings-button"
            onClick={itemSelectHandler}
          >
            <AiFillSetting />
          </Button>
          <Button
            className="dashboard-item__remove-button"
            onClick={deleteItemHandler}
          >
            <BsFillTrashFill />
          </Button>
        </div>
        <div className="dashboard-item__content">
          <Button
            className="dashboard-item__select-button"
            onClick={itemSelectHandler}
          >
            Select DashBoard Item
          </Button>
        </div>
      </react.Fragment>
    );
  }

  return <Card className="dashboard-item">{component}</Card>;
};

export default DashBoardItem;
